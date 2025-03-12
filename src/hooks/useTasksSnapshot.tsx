import type { Tasks } from '@/types/tasks';

import useUserState from './useUserState';
import { useEffect, useState } from 'react';
import { onSnapshot, orderBy, query, Timestamp, where, limit } from 'firebase/firestore';
import { tasksCollectionRef } from '@/firebase';
import { taskSchema } from '@/schemas/tasks';
import { normalizeError } from '@/utils/error';

interface TasksSnapshotOptions {
	timestampStart: number;
	timestampEnd: number;
	limit?: number;
}

const useTasksSnapshot = ({
	timestampStart,
	timestampEnd,
	limit: limitQuery = 30,
}: TasksSnapshotOptions) => {
	const [tasks, setTasks] = useState<Tasks | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<Error | undefined>(undefined);
	const [user, , errorUser] = useUserState();

	const uid = user ? user.uid : null;

	const handleError = (error: Error) => {
		setIsLoading(false);
		setError(error);
	};

	if (errorUser) {
		console.error(errorUser);
	}

	useEffect(() => {
		if (!errorUser?.message) {
			return;
		}

		handleError(new Error('Authorization error'));
	}, [errorUser?.message]);

	useEffect(() => {
		if (!uid) {
			return;
		}

		const startDate = Timestamp.fromMillis(timestampStart);
		const endDate = Timestamp.fromMillis(timestampEnd);

		const q = query(
			tasksCollectionRef(uid),
			where('dueAt', '>=', startDate),
			where('dueAt', '<', endDate),
			orderBy('dueAt', 'desc'),
			limit(limitQuery),
		);

		const unsubscribe = onSnapshot(
			q,
			async (querySnapshot) => {
				const tasksData: unknown[] = [];

				querySnapshot.forEach(async (doc) => {
					tasksData.push({
						id: doc.id,
						...doc.data(),
					});
				});

				const tasksDataPromises = tasksData.map(async (taskData) => {
					return await taskSchema.validate(taskData);
				});

				try {
					const tasks = await Promise.all(tasksDataPromises);

					setTasks(tasks);
					setIsLoading(false);
				} catch (error) {
					handleError(normalizeError(error));
				}
			},
			(error) => {
				handleError(error);
			},
		);

		return () => unsubscribe();
	}, [uid, timestampStart, timestampEnd, limitQuery]);

	return [tasks, isLoading, error] as const;
};

export default useTasksSnapshot;
