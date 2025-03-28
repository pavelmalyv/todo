import type { TagId } from '@/types/fields';

import { auth, tagsCollectionRef } from '@/firebase';
import { deleteDoc, doc } from 'firebase/firestore';
import { useState } from 'react';

const useDeleteTag = () => {
	const [isLoading, setIsLoading] = useState(false);

	const deleteTag = async (id: TagId) => {
		const user = auth.currentUser;
		if (!user) {
			throw new Error('The user is not logged in');
		}

		try {
			setIsLoading(true);

			const docRef = doc(tagsCollectionRef(user.uid), id);
			await deleteDoc(docRef);
		} finally {
			setIsLoading(false);
		}
	};

	return [deleteTag, isLoading] as const;
};

export default useDeleteTag;
