import type { SaveTask } from '@/types/tasks';

import { auth, tasksCollectionRef } from '@/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';

const useSaveTask = () => {
	const [isLoading, setIsLoading] = useState(false);

	const saveTask = async (id: string, data: SaveTask) => {
		const user = auth.currentUser;
		if (!user) {
			throw new Error('The user is not logged in');
		}

		try {
			setIsLoading(true);

			const docRef = doc(tasksCollectionRef(user.uid), id);
			await updateDoc(docRef, data);

			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);

			throw error;
		}
	};

	return [saveTask, isLoading] as const;
};

export default useSaveTask;
