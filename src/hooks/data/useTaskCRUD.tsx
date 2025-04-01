import type { SaveTask, TaskId } from '@/types/tasks';

import useFirestoreCRUD from './useFirestoreCRUD';

import { tasksCollectionRef } from '@/firebase';
import { doc } from 'firebase/firestore';
import { getCurrentUserOrThrow } from '@/utils/error';
import { useCallback } from 'react';

const useTaskCRUD = () => {
	const { updateFirestore, addFirestore, deleteFirestore } = useFirestoreCRUD();

	const updateDocFirestore = updateFirestore.updateDoc;
	const updateTask = useCallback(
		async (id: TaskId, data: Partial<SaveTask>) => {
			const user = getCurrentUserOrThrow();

			const docRef = doc(tasksCollectionRef(user.uid), id);
			await updateDocFirestore(docRef, data);
		},
		[updateDocFirestore],
	);

	const addDocFirestore = addFirestore.addDoc;
	const addTask = useCallback(
		async (data: SaveTask) => {
			const user = getCurrentUserOrThrow();

			const collectionRef = tasksCollectionRef(user.uid);
			await addDocFirestore(collectionRef, data);
		},
		[addDocFirestore],
	);

	const deleteDocFirestore = deleteFirestore.deleteDoc;
	const deleteTask = useCallback(
		async (id: TaskId) => {
			const user = getCurrentUserOrThrow();

			const docRef = doc(tasksCollectionRef(user.uid), id);
			await deleteDocFirestore(docRef);
		},
		[deleteDocFirestore],
	);

	return {
		updateTask: {
			isLoading: updateFirestore.isLoading,
			update: updateTask,
		},
		addTask: {
			isLoading: addFirestore.isLoading,
			add: addTask,
		},
		deleteTask: {
			isLoading: deleteFirestore.isLoading,
			delete: deleteTask,
		},
	};
};

export default useTaskCRUD;
