import type { Tag } from '@/types/tags';
import type { TagId } from '@/types/fields';

import useUserState from './useUserState';
import { useCallback, useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { tagsCollectionRef } from '@/firebase';
import { tagSchema } from '@/schemas/tags';
import { normalizeError, NotFoundError } from '@/utils/error';

const useTagSnapshot = (id: TagId | undefined) => {
	const [tag, setTag] = useState<Tag | null>(null);
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
		if (!uid || !id) {
			return;
		}

		const unsubscribe = onSnapshot(
			doc(tagsCollectionRef(uid), id),
			async (querySnapshot) => {
				try {
					setIsLoading(true);

					if (!querySnapshot.data()) {
						throw new NotFoundError();
					}

					const tag = await tagSchema.validate({
						id: querySnapshot.id,
						...querySnapshot.data(),
					});

					setTag(tag);
					setIsLoading(false);
				} catch (error) {
					handleError(error);
				}
			},
			(error) => {
				handleError(error);
			},
		);

		return () => unsubscribe();
	}, [uid, id, handleError]);

	return [tag, isLoading, error] as const;
};

export default useTagSnapshot;
