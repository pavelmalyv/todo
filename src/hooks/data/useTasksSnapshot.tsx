import type { Tasks } from '@/types/tasks';
import type { QueryConstraint, QueryDocumentSnapshot } from 'firebase/firestore';
import type { TagId } from '@/types/fields';

import useUserState from './useUserState';
import useSubscribesScopesTasks from './useSubscribesScopesTasks';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { auth, tasksCollectionRef } from '@/firebase';
import { normalizeError } from '@/utils/error';
import { v4 as uuid } from 'uuid';
import {
	onSnapshot,
	orderBy,
	query,
	Timestamp,
	where,
	limit,
	startAfter,
} from 'firebase/firestore';

interface TasksSnapshotOptions {
	timestampStart?: number;
	timestampEnd?: number;
	tagId?: TagId;
	limit?: number;
}
const useTasksSnapshot = ({
	timestampStart,
	timestampEnd,
	tagId,
	limit: limitQuery = 30,
}: TasksSnapshotOptions) => {
	const limitQueryNext = limitQuery + 1;

	const [hasMoreData, setHasMoreData] = useState(false);
	const [isLoadingMore, setIsLoadingMore] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<Error | undefined>(undefined);
	const [isInit, setIsInit] = useState(false);
	const [user, , errorUser] = useUserState();
	const uid = user ? user.uid : null;

	const {
		subscribesScopes,
		unsubscribeFetchMore,
		setTasksFromSnapshot,
		setEmptySubscribeScope,
		setUnsubscribeScope,
		deleteSubscribeScope,
	} = useSubscribesScopesTasks();

	if (errorUser) {
		console.error(errorUser);
	}

	const createQuery = useCallback(
		({
			uid,
			limitQuery,
			startDoc,
		}: {
			uid: string;
			limitQuery?: number;
			startDoc?: QueryDocumentSnapshot;
		}) => {
			const conditions: QueryConstraint[] = [];

			if (timestampStart) {
				const startDate = Timestamp.fromMillis(timestampStart);
				conditions.push(where('dueAt', '>=', startDate));
			}

			if (timestampEnd) {
				const endDate = Timestamp.fromMillis(timestampEnd);
				conditions.push(where('dueAt', '<', endDate));
			}

			if (tagId) {
				conditions.push(where('tagId', '==', tagId));
			}

			conditions.push(orderBy('dueAt', 'desc'));

			if (limitQuery) {
				conditions.push(limit(limitQuery));
			}

			if (startDoc) {
				conditions.push(startAfter(startDoc));
			}

			return query(tasksCollectionRef(uid), ...conditions);
		},
		[timestampStart, timestampEnd, tagId],
	);

	const handleErrorInit = useCallback((error: Error) => {
		setIsLoading(false);
		setError(error);
	}, []);

	const fetchMore = useCallback(() => {
		if (isLoading || isLoadingMore) {
			return;
		}

		if (!hasMoreData) {
			const error = new Error('There is no data to fetch');
			console.error(error);
			throw error;
		}

		const user = auth.currentUser;
		if (!user) {
			const error = new Error('Authorization error');
			console.error(error);
			throw error;
		}

		if (!subscribesScopes.ids.length) {
			const error = new Error('The first data has not been uploaded yet');
			console.error(error);
			throw error;
		}

		const lastSubscribesScopes =
			subscribesScopes.entities[subscribesScopes.ids[subscribesScopes.ids.length - 1]];
		const penultimateTaskData =
			lastSubscribesScopes.data.entities[
				lastSubscribesScopes.data.ids[lastSubscribesScopes.data.ids.length - 2]
			];

		const subscribeId = uuid();
		setEmptySubscribeScope(subscribeId, 'fetch');

		const q = createQuery({
			uid: user.uid,
			limitQuery: limitQueryNext,
			startDoc: penultimateTaskData.doc,
		});

		const unsubscribe = onSnapshot(
			q,
			async (querySnapshot) => {
				try {
					setIsLoadingMore(true);
					await setTasksFromSnapshot(querySnapshot, subscribeId);
				} catch (error) {
					console.error(error);
					throw error;
				} finally {
					setIsLoadingMore(false);
				}
			},
			(error) => {
				console.error(error);
				throw error;
			},
		);

		setUnsubscribeScope(subscribeId, unsubscribe);
	}, [
		isLoading,
		isLoadingMore,
		hasMoreData,
		limitQueryNext,
		subscribesScopes,
		createQuery,
		setEmptySubscribeScope,
		setTasksFromSnapshot,
		setUnsubscribeScope,
	]);

	useEffect(() => {
		if (!uid) {
			return;
		}

		const subscribeId = uuid();
		setEmptySubscribeScope(subscribeId, 'init');

		const q = createQuery({ uid, limitQuery: limitQueryNext });
		const unsubscribe = onSnapshot(
			q,
			async (querySnapshot) => {
				try {
					await setTasksFromSnapshot(querySnapshot, subscribeId);
					setIsInit(true);
					setIsLoading(false);
				} catch (error) {
					handleErrorInit(normalizeError(error));

					console.error(error);
				}
			},
			(error) => {
				handleErrorInit(error);

				console.error(error);
			},
		);

		setUnsubscribeScope(subscribeId, unsubscribe);

		return () => deleteSubscribeScope(subscribeId);
	}, [
		uid,
		limitQueryNext,
		createQuery,
		setTasksFromSnapshot,
		setEmptySubscribeScope,
		setUnsubscribeScope,
		deleteSubscribeScope,
		handleErrorInit,
	]);

	useEffect(() => {
		if (!subscribesScopes.ids.length) {
			return;
		}

		const lastSubscribesScopes =
			subscribesScopes.entities[subscribesScopes.ids[subscribesScopes.ids.length - 1]];
		const hasMoreData = lastSubscribesScopes.data.ids.length >= limitQueryNext;

		setHasMoreData(hasMoreData);
	}, [subscribesScopes, limitQueryNext]);

	useEffect(() => {
		if (!errorUser?.message) {
			return;
		}

		handleErrorInit(new Error('Authorization error'));
	}, [errorUser?.message, handleErrorInit]);

	useEffect(() => {
		return () => unsubscribeFetchMore();
	}, [unsubscribeFetchMore]);

	const tasks = useMemo(() => {
		const tasks: Tasks = [];

		const lengthSubscribesScopes = subscribesScopes.ids.length - 1;
		subscribesScopes.ids.forEach((subscribeScopeId, indexSubscribesScopes) => {
			const subscribeScope = subscribesScopes.entities[subscribeScopeId];
			const lengthTaskData = subscribeScope.data.ids.length - 1;
			subscribeScope.data.ids.forEach((taskDataId, index) => {
				if (
					lengthTaskData === index &&
					!(lengthSubscribesScopes === indexSubscribesScopes && !hasMoreData)
				) {
					return;
				}

				tasks.push(subscribeScope.data.entities[taskDataId].task);
			});
		});

		return isInit ? tasks : null;
	}, [subscribesScopes, hasMoreData, isInit]);

	return [tasks, isLoading, error, { fetchMore, isLoadingMore, hasMoreData }] as const;
};

export default useTasksSnapshot;
