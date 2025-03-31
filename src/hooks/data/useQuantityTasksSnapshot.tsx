import type { TagId } from '@/types/fields';

import useTasksSnapshot from './useTasksSnapshot';

interface QuantityTasksSnapshotOptions {
	timestampStart?: number;
	timestampEnd?: number;
	tagId?: TagId;
	limit?: number;
}

const useQuantityTasksSnapshot = ({
	timestampStart,
	timestampEnd,
	tagId,
	limit,
}: QuantityTasksSnapshotOptions) => {
	const [tasks, isLoading, error] = useTasksSnapshot({
		timestampStart,
		timestampEnd,
		tagId,
		limit,
	});

	if (error) {
		console.error(error);
	}

	let quantity: number | null = null;

	if (tasks) {
		let counter = 0;

		tasks.forEach((task) => {
			if (!task.done) {
				counter++;
			}
		});

		quantity = counter;
	}

	return [quantity, isLoading, error] as const;
};

export default useQuantityTasksSnapshot;
