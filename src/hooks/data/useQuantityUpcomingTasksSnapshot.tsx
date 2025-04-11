import type { Tasks } from '@/types/tasks';

import useTasksSnapshot from './useTasksSnapshot';
import { getDateRanges } from '@/utils/date';
import { useMemo } from 'react';
import { LIMIT_UPCOMING_TASKS } from '@/consts/config';

const getQuantityTasks = (tasks: Tasks) => {
	let quantity = 0;

	tasks.forEach((task) => {
		if (!task.done) {
			quantity++;
		}
	});

	return quantity;
};

const useQuantityUpcomingTasksSnapshot = () => {
	const dateRanges = getDateRanges();

	const [today, isLoadingToday, errorToday] = useTasksSnapshot({
		timestampStart: dateRanges.today.start,
		timestampEnd: dateRanges.today.end,
		limit: LIMIT_UPCOMING_TASKS,
	});
	const todayQuantity = useMemo(() => (today ? getQuantityTasks(today) : null), [today]);

	const [tomorrow, isLoadingTomorrow, errorTomorrow] = useTasksSnapshot({
		timestampStart: dateRanges.tomorrow.start,
		timestampEnd: dateRanges.tomorrow.end,
		limit: LIMIT_UPCOMING_TASKS,
	});
	const tomorrowQuantity = useMemo(
		() => (tomorrow ? getQuantityTasks(tomorrow) : null),
		[tomorrow],
	);

	const [near, isLoadingNear, errorNear] = useTasksSnapshot({
		timestampStart: dateRanges.near.start,
		timestampEnd: dateRanges.near.end,
		limit: LIMIT_UPCOMING_TASKS,
	});
	const nearQuantity = useMemo(() => (near ? getQuantityTasks(near) : null), [near]);

	const isLoading = isLoadingToday || isLoadingTomorrow || isLoadingNear;
	let quantity: number | null = null;
	let error: Error | undefined;

	if (todayQuantity !== null && tomorrowQuantity !== null && nearQuantity !== null) {
		quantity = todayQuantity + tomorrowQuantity + nearQuantity;
	}

	if (errorToday || errorTomorrow || errorNear) {
		error = new Error("Couldn't get the number of upcoming tasks");
	}

	if (errorToday) {
		console.error(errorToday);
	}

	if (errorTomorrow) {
		console.error(errorTomorrow);
	}

	if (errorNear) {
		console.error(errorNear);
	}

	return [quantity, isLoading, error] as const;
};

export default useQuantityUpcomingTasksSnapshot;
