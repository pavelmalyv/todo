import type { Tasks } from '@/types/tasks';

import useUserState from './useUserState';
import { useEffect, useState } from 'react';
import { onSnapshot, query } from 'firebase/firestore';
import { tasksCollectionRef } from '@/firebase';
import { taskSchema } from '@/schemas/tasks';

const useTasksSnapshot = () => {
	const [tasks, setTasks] = useState<Tasks | null>(null);
	const [error, setError] = useState<unknown | undefined>(undefined);
	const [user, , errorUser] = useUserState({
		isHandleError: false,
	});

	const uid = user ? user.uid : null;

	useEffect(() => {
		if (!errorUser) {
			return;
		}

		setError(errorUser);
	}, [errorUser]);

	useEffect(() => {
		if (!uid) {
			return;
		}

		const q = query(tasksCollectionRef(uid));

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
				} catch (error) {
					setError(error);
				}
			},
			(error) => {
				setError(error);
			},
		);

		return () => unsubscribe();
	}, [uid]);

	return [tasks, user, error] as const;
};

export default useTasksSnapshot;
