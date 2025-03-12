import useTasksSnapshot from './useTasksSnapshot';

interface QuantityTasksSnapshotOptions {
	timestampStart: number;
	timestampEnd: number;
	limit?: number;
}

const useQuantityTasksSnapshot = ({
	timestampStart,
	timestampEnd,
	limit,
}: QuantityTasksSnapshotOptions) => {
	const [tasks, , isLoading, error] = useTasksSnapshot({ timestampStart, timestampEnd, limit });
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
