import type { CreateQueryFilter } from '@/types/tasks';
import type { QueryConstraint } from 'firebase/firestore';

import { limit, orderBy, query, startAfter, Timestamp, where } from 'firebase/firestore';
import { tasksCollectionRef } from '@/firebase';
import { LIMIT_TASKS_DEFAULT } from '@/consts/config';

export const createQueryTasks = (
	uid: string,
	{
		tagId,
		timestampStart,
		timestampEnd,
		limit: limitQuery = LIMIT_TASKS_DEFAULT,
		startDoc,
	}: CreateQueryFilter,
) => {
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
};
