import type { SaveTask, TaskId } from '@/types/tasks';

import { auth, tasksCollectionRef } from '@/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';

const useSaveTask = () => {
	const [isLoading, setIsLoading] = useState(false);

	const saveTask = async (id: TaskId, data: SaveTask) => {
		const user = auth.currentUser;
		if (!user) {
			throw new Error('The user is not logged in');
		}

		try {
			setIsLoading(true);

			const docRef = doc(tasksCollectionRef(user.uid), id);
			await updateDoc(docRef, data);
		} finally {
			setIsLoading(false);
		}
	};

	return [saveTask, isLoading] as const;
};

export default useSaveTask;
