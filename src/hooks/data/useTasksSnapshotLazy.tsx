import type { Unsubscribe } from 'firebase/firestore';
import type { Tasks } from '@/types/tasks';

import { auth } from '@/firebase';
import { taskSchema } from '@/schemas/tasks';
import { normalizeError } from '@/utils/error';
import { onSnapshot } from 'firebase/firestore';
import { useCallback, useEffect, useRef, useState } from 'react';
import { produce } from 'immer';
import { createQueryTasks } from '@/utils/tasks';

type SnapshotId = string | number;
interface CreateTasksSnapshotOptions {
	id: SnapshotId;
	timestampStart: number;
	timestampEnd: number;
	limit: number;
}

const useTasksSnapshotLazy = () => {
	const [tasksSnapshots, setTasksSnapshots] = useState<{
		[key: string]: {
			tasks: Tasks | null;
			isLoading: boolean;
			error: Error | undefined;
		};
	}>({});
	const unsubscribesRef = useRef<{
		[key: string]: Unsubscribe;
	}>({});

	const handleError = useCallback((id: SnapshotId, error: unknown) => {
		console.error(error);

		setTasksSnapshots(
			produce((draft) => {
				const snapshot: (typeof draft)[SnapshotId] | undefined = draft[id];
				if (snapshot) {
					draft[id].isLoading = false;
					draft[id].error = normalizeError(error);
				}
			}),
		);
	}, []);

	const createTasksSnapshot = useCallback(
		async ({ id, timestampStart, timestampEnd, limit }: CreateTasksSnapshotOptions) => {
			setTasksSnapshots(
				produce((draft) => {
					draft[id] = {
						tasks: null,
						isLoading: true,
						error: undefined,
					};
				}),
			);

			const user = auth.currentUser;
			if (!user) {
				handleError(id, new Error('Authorization error'));
				return;
			}

			const q = createQueryTasks(user.uid, { timestampStart, timestampEnd, limit });

			const unsubscribe = onSnapshot(
				q,
				async (querySnapshot) => {
					setTasksSnapshots(
						produce((draft) => {
							draft[id].isLoading = true;
						}),
					);

					const tasks: Tasks = [];

					const validationResults = await Promise.allSettled(
						querySnapshot.docs.map((doc) => {
							return taskSchema.validate({
								id: doc.id,
								...doc.data(),
							});
						}),
					);

					validationResults.forEach((result) => {
						if (result.status === 'fulfilled') {
							tasks.push(result.value);
						}

						if (result.status === 'rejected') {
							console.error(result.reason);
						}
					});

					setTasksSnapshots(
						produce((draft) => {
							const snapshot: (typeof draft)[SnapshotId] | undefined = draft[id];
							if (snapshot) {
								snapshot.tasks = tasks;
								snapshot.isLoading = false;
							}
						}),
					);
				},
				(error) => {
					handleError(id, error);
				},
			);

			unsubscribesRef.current[id] = unsubscribe;
		},
		[handleError],
	);

	const deleteTasksSnapshot = useCallback((id: SnapshotId) => {
		const unsubscribe: Unsubscribe | undefined = unsubscribesRef.current[id];
		if (unsubscribe) {
			unsubscribe();
		}

		setTasksSnapshots(
			produce((draft) => {
				delete draft[id];
			}),
		);
	}, []);

	useEffect(() => {
		return () => {
			const unsubscribes = unsubscribesRef.current;

			for (const key in unsubscribes) {
				const unsubscribe = unsubscribes[key];
				unsubscribe();
			}

			unsubscribesRef.current = {};
			setTasksSnapshots({});
		};
	}, []);

	return [tasksSnapshots, createTasksSnapshot, deleteTasksSnapshot] as const;
};

export default useTasksSnapshotLazy;
