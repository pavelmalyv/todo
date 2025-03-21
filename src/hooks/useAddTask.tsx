import type { SaveTask } from '@/types/tasks';

import { addDoc, serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
import { auth, tasksCollectionRef } from '@/firebase';

const useAddTask = () => {
	const [isLoading, setIsLoading] = useState(false);

	const addTask = async (data: SaveTask) => {
		const user = auth.currentUser;
		if (!user) {
			throw new Error('The user is not logged in');
		}

		try {
			setIsLoading(true);

			return await addDoc(tasksCollectionRef(user.uid), {
				...data,
				createdAt: serverTimestamp(),
			});
		} finally {
			setIsLoading(false);
		}
	};

	return [addTask, isLoading] as const;
};

export default useAddTask;
