import useQuantityTasksSnapshot from './useQuantityTasksSnapshot';

import { getDateRanges } from '@/utils/date';
import { LIMIT_UPCOMING_TASKS } from '@/consts/docLimits';

const useQuantityUpcomingTasksSnapshot = () => {
	const dateRanges = getDateRanges();

	const [today, isLoadingToday, errorToday] = useQuantityTasksSnapshot({
		timestampStart: dateRanges.today.start,
		timestampEnd: dateRanges.today.end,
		limit: LIMIT_UPCOMING_TASKS,
	});

	const [tomorrow, isLoadingTomorrow, errorTomorrow] = useQuantityTasksSnapshot({
		timestampStart: dateRanges.tomorrow.start,
		timestampEnd: dateRanges.tomorrow.end,
		limit: LIMIT_UPCOMING_TASKS,
	});

	const [near, isLoadingNear, errorNear] = useQuantityTasksSnapshot({
		timestampStart: dateRanges.near.start,
		timestampEnd: dateRanges.near.end,
		limit: LIMIT_UPCOMING_TASKS,
	});

	const isLoading = isLoadingToday || isLoadingTomorrow || isLoadingNear;
	let quantity: number | null = null;
	let error: Error | undefined;

	if (today !== null && tomorrow !== null && near !== null) {
		quantity = today + tomorrow + near;
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
