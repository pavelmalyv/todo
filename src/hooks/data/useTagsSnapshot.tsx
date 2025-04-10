import type { Tags } from '@/types/tags';

import useUserState from './useUserState';
import { useCallback, useEffect, useState } from 'react';
import { limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import { tagsCollectionRef } from '@/firebase';
import { tagSchema } from '@/schemas/tags';
import { normalizeError } from '@/utils/error';
import { LIMIT_TAGS } from '@/consts/config';

const useTagsSnapshot = () => {
	const [tags, setTags] = useState<Tags | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<Error | undefined>(undefined);
	const [user, , errorUser] = useUserState();
	const uid = user ? user.uid : null;

	if (errorUser) {
		console.error(errorUser);
	}

	const handleError = useCallback((error: unknown) => {
		setError(normalizeError(error));
		setIsLoading(false);

		console.error(error);
	}, []);

	useEffect(() => {
		if (!errorUser?.message) {
			return;
		}

		handleError(new Error('Authorization error'));
	}, [errorUser?.message, handleError]);

	useEffect(() => {
		if (!uid) {
			return;
		}

		const q = query(tagsCollectionRef(uid), orderBy('createdAt', 'asc'), limit(LIMIT_TAGS));

		const unsubscribe = onSnapshot(
			q,
			async (querySnapshot) => {
				setIsLoading(true);

				const updatedTags: Tags = [];
				const validationResults = await Promise.allSettled(
					querySnapshot.docs.map((doc) => {
						return tagSchema.validate({
							id: doc.id,
							...doc.data(),
						});
					}),
				);

				validationResults.forEach((result) => {
					if (result.status === 'fulfilled') {
						updatedTags.push(result.value);
					}

					if (result.status === 'rejected') {
						console.error(result.reason);
					}
				});

				setTags(updatedTags);
				setIsLoading(false);
			},
			(error) => {
				handleError(error);
			},
		);

		return () => unsubscribe();
	}, [uid, handleError]);

	return [tags, isLoading, error] as const;
};

export default useTagsSnapshot;
