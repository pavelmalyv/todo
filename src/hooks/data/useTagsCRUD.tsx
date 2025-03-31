import type { TagId } from '@/types/fields';
import type { SaveTag } from '@/types/tags';

import useFirestoreCRUD from './useFirestoreCRUD';

import { tagsCollectionRef } from '@/firebase';
import { getCurrentUser } from '@/utils/firestore';
import { doc } from 'firebase/firestore';
import { useCallback } from 'react';

const useTagsCRUD = () => {
	const { updateFirestore, addFirestore, deleteFirestore } = useFirestoreCRUD();

	const updateDocFirestore = updateFirestore.updateDoc;
	const updateTag = useCallback(
		async (id: TagId, data: Partial<SaveTag>) => {
			const user = getCurrentUser();

			const docRef = doc(tagsCollectionRef(user.uid), id);
			await updateDocFirestore(docRef, data);
		},
		[updateDocFirestore],
	);

	const addDocFirestore = addFirestore.addDoc;
	const addTag = useCallback(
		async (data: SaveTag) => {
			const user = getCurrentUser();

			const collectionRef = tagsCollectionRef(user.uid);
			await addDocFirestore(collectionRef, data);
		},
		[addDocFirestore],
	);

	const deleteDocFirestore = deleteFirestore.deleteDoc;
	const deleteTag = useCallback(
		async (id: TagId) => {
			const user = getCurrentUser();

			const docRef = doc(tagsCollectionRef(user.uid), id);
			await deleteDocFirestore(docRef);
		},
		[deleteDocFirestore],
	);

	return {
		updateTag: {
			isLoading: updateFirestore.isLoading,
			update: updateTag,
		},
		addTag: {
			isLoading: addFirestore.isLoading,
			add: addTag,
		},
		deleteTag: {
			isLoading: deleteFirestore.isLoading,
			delete: deleteTag,
		},
	};
};

export default useTagsCRUD;
