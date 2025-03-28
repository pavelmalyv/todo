import type { SaveTag } from '@/types/tags';
import type { TagId } from '@/types/fields';

import { auth, tagsCollectionRef } from '@/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';

const useSaveTag = () => {
	const [isLoading, setIsLoading] = useState(false);

	const saveTag = async (id: TagId, data: SaveTag) => {
		const user = auth.currentUser;
		if (!user) {
			throw new Error('The user is not logged in');
		}

		try {
			setIsLoading(true);

			const docRef = doc(tagsCollectionRef(user.uid), id);
			await updateDoc(docRef, data);
		} finally {
			setIsLoading(false);
		}
	};

	return [saveTag, isLoading] as const;
};

export default useSaveTag;
