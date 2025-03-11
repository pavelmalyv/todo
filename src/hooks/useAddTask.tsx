import type { AddTask } from '@/types/tasks';

import { addDoc, serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
import { auth, tasksCollectionRef } from '@/firebase';

const useAddTask = () => {
	const [isLoading, setIsLoading] = useState(false);

	const addTask = async (data: AddTask) => {
		const user = auth.currentUser;
		if (!user) {
			throw new Error('The user is not logged in');
		}

		try {
			setIsLoading(true);
			const docRef = await addDoc(tasksCollectionRef(user.uid), {
				...data,
				createdAt: serverTimestamp(),
			});

			setIsLoading(false);
			return docRef;
		} catch (error) {
			setIsLoading(false);

			throw error;
		}
	};

	return [addTask, isLoading] as const;
};

export default useAddTask;
