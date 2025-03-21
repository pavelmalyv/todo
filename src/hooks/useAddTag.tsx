import type { SaveTag } from '@/types/tags';

import { auth, tagsCollectionRef } from '@/firebase';
import { addDoc, serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';

const useAddTag = () => {
	const [isLoading, setIsLoading] = useState(false);

	const addTag = async (data: SaveTag) => {
		const user = auth.currentUser;
		if (!user) {
			throw new Error('The user is not logged in');
		}

		try {
			setIsLoading(true);
			const docRef = await addDoc(tagsCollectionRef(user.uid), {
				...data,
				createdAt: serverTimestamp(),
			});

			setIsLoading(false);
			return docRef;
		} catch (error) {
			setIsLoading(false);

			throw error;
		}
	};

	return [addTag, isLoading] as const;
};

export default useAddTag;
