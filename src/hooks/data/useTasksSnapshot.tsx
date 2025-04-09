import type { CreateQueryFilter, Tasks } from '@/types/tasks';

import useUserState from './useUserState';
import useSubscribesScopesTasks from './useSubscribesScopesTasks';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { auth } from '@/firebase';
import { normalizeError } from '@/utils/error';
import { v4 as uuid } from 'uuid';
import { onSnapshot } from 'firebase/firestore';
import { createQueryTasks } from '@/utils/tasks';
import { LIMIT_TASKS_DEFAULT } from '@/consts/config';

const useTasksSnapshot = ({
	timestampStart,
	timestampEnd,
	tagId,
	limit: limitQuery = LIMIT_TASKS_DEFAULT,
}: CreateQueryFilter) => {
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
		(uid: string, filter: CreateQueryFilter) =>
			createQueryTasks(uid, { timestampStart, timestampEnd, tagId, ...filter }),
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

		const q = createQuery(user.uid, {
			limit: limitQueryNext,
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
					throw normalizeError(error);
				} finally {
					setIsLoadingMore(false);
				}
			},
			(error) => {
				console.error(error);
				throw normalizeError(error);
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

		const q = createQuery(uid, { limit: limitQueryNext });
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
				handleErrorInit(normalizeError(error));

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
