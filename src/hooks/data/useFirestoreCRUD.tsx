import type { CollectionReference, DocumentData, DocumentReference } from 'firebase/firestore';

import { addDoc, deleteDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { useCallback, useState } from 'react';
import { produce } from 'immer';

const useFirestoreCRUD = () => {
	const [loading, setLoading] = useState({
		update: false,
		add: false,
		delete: false,
	});

	const updateDocFirestore = useCallback(async (docRef: DocumentReference, data: DocumentData) => {
		try {
			setLoading(
				produce((draft) => {
					draft.update = true;
				}),
			);

			await updateDoc(docRef, data);
		} finally {
			setLoading(
				produce((draft) => {
					draft.update = false;
				}),
			);
		}
	}, []);

	const addDocFirestore = useCallback(
		async (collectionRef: CollectionReference, data: DocumentData) => {
			try {
				setLoading(
					produce((draft) => {
						draft.add = true;
					}),
				);

				return await addDoc(collectionRef, {
					...data,
					createdAt: serverTimestamp(),
				});
			} finally {
				setLoading(
					produce((draft) => {
						draft.add = false;
					}),
				);
			}
		},
		[],
	);

	const deleteDocFirestore = useCallback(async (docRef: DocumentReference) => {
		try {
			setLoading(
				produce((draft) => {
					draft.delete = true;
				}),
			);

			await deleteDoc(docRef);
		} finally {
			setLoading(
				produce((draft) => {
					draft.delete = false;
				}),
			);
		}
	}, []);

	return {
		updateFirestore: {
			updateDoc: updateDocFirestore,
			isLoading: loading.update,
		},
		addFirestore: {
			addDoc: addDocFirestore,
			isLoading: loading.add,
		},
		deleteFirestore: {
			deleteDoc: deleteDocFirestore,
			isLoading: loading.delete,
		},
	};
};

export default useFirestoreCRUD;
