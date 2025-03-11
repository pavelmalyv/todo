import { useState } from 'react';
import { auth, tasksCollectionRef } from '@/firebase';
import { deleteDoc, doc } from 'firebase/firestore';

const useDeleteTask = () => {
	const [isLoading, setIsLoading] = useState(false);

	const deleteTask = async (id: string) => {
		const user = auth.currentUser;
		if (!user) {
			throw new Error('The user is not logged in');
		}

		try {
			setIsLoading(true);

			const docRef = doc(tasksCollectionRef(user.uid), id);
			await deleteDoc(docRef);

			setIsLoading(false);
			return docRef;
		} catch (error) {
			setIsLoading(false);

			throw error;
		}
	};

	return [deleteTask, isLoading] as const;
};

export default useDeleteTask;
