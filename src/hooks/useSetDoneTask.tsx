import type { TaskId } from '@/types/tasks';

import { auth } from '@/firebase';
import { setTaskDoc } from '@/utils/firestore';
import { useState } from 'react';

const useSetDoneTask = () => {
	const [isLoading, setIsLoading] = useState(false);

	const setDoneTask = async (id: TaskId, isDone: boolean) => {
		const user = auth.currentUser;
		if (!user) {
			throw new Error('Invalid user value');
		}

		try {
			setIsLoading(true);

			await setTaskDoc(user.uid, id, { done: isDone });
		} finally {
			setIsLoading(false);
		}
	};

	return [setDoneTask, isLoading] as const;
};

export default useSetDoneTask;
