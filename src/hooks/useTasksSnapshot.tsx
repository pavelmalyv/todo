import type { Tasks } from '@/types/tasks';

import useUserState from './useUserState';
import { useEffect, useState } from 'react';
import { onSnapshot, orderBy, query, Timestamp, where } from 'firebase/firestore';
import { tasksCollectionRef } from '@/firebase';
import { taskSchema } from '@/schemas/tasks';

const useTasksSnapshot = (timestampStart: number, timestampEnd: number) => {
	const [tasks, setTasks] = useState<Tasks | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<unknown | undefined>(undefined);
	const [user, , errorUser] = useUserState();

	const uid = user ? user.uid : null;

	const handleError = (error: unknown) => {
		setIsLoading(false);
		setError(error);
	};

	useEffect(() => {
		if (!errorUser) {
			return;
		}

		handleError(errorUser);
	}, [errorUser]);

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
					handleError(error);
				}
			},
			(error) => {
				handleError(error);
			},
		);

		return () => unsubscribe();
	}, [uid, timestampStart, timestampEnd]);

	return [tasks, user, isLoading, error] as const;
};

export default useTasksSnapshot;
