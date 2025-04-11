import type { Tag } from '@/types/tags';
import type { TagId } from '@/types/fields';

import useUserState from './useUserState';
import { useCallback, useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { tagsCollectionRef } from '@/firebase';
import { tagSchema } from '@/schemas/tags';
import { normalizeError, NotFoundError } from '@/utils/error';

interface TagSnapshotOptions {
	isOptional?: boolean;
}

const useTagSnapshot = (id: TagId | undefined, { isOptional }: TagSnapshotOptions = {}) => {
	const [tag, setTag] = useState<Tag | null | undefined>(null);
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
				setIsLoading(true);

				let tag: Tag | undefined;

				if (querySnapshot.data()) {
					try {
						tag = await tagSchema.validate({
							id: querySnapshot.id,
							...querySnapshot.data(),
						});
					} catch (error) {
						console.error(error);
					}
				}

				if (tag === undefined && !isOptional) {
					handleError(new NotFoundError());
				}

				setTag(tag);
				setIsLoading(false);
			},
			(error) => {
				handleError(error);
			},
		);

		return () => unsubscribe();
	}, [uid, id, isOptional, handleError]);

	return [tag, isLoading, error] as const;
};

export default useTagSnapshot;
