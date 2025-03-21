import type { TaskId } from '@/types/tasks';

import { useState } from 'react';
import { auth, tasksCollectionRef } from '@/firebase';
import { deleteDoc, doc } from 'firebase/firestore';

const useDeleteTask = () => {
	const [isLoading, setIsLoading] = useState(false);

	const deleteTask = async (id: TaskId) => {
		const user = auth.currentUser;
		if (!user) {
			throw new Error('The user is not logged in');
		}

		try {
			setIsLoading(true);

			const docRef = doc(tasksCollectionRef(user.uid), id);
			await deleteDoc(docRef);
		} finally {
			setIsLoading(false);
		}
	};

	return [deleteTask, isLoading] as const;
};

export default useDeleteTask;
