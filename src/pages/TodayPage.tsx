import Profile from '@/components/profile/Profile';
import Section from '@/components/UI/section/Section';
import TasksList from '@/components/tasksList/TasksList';
import useTasksSnapshot from '@/hooks/useTasksSnapshot';
import useQuantityTasksSnapshot from '@/hooks/useQuantityTasksSnapshot';
import useNotificationError from '@/hooks/useNotificationError';

import { getDateRanges } from '@/utils/date';
import { LIMIT_QUANTITY_TODAY, LIMIT_TODAY } from '@/consts/docLimits';
import { ERRORS_MESSAGES, NOT_FOUND_MESSAGES } from '@/consts/messages';
import { getQuantityShort } from '@/utils/quantity';

const TodayPage = () => {
	const dateRanges = getDateRanges();

	const [tasks, isLoading, errorToday] = useTasksSnapshot({
		timestampStart: dateRanges.today.start,
		timestampEnd: dateRanges.today.end,
		limit: LIMIT_TODAY,
	});
	const tasksToday = tasks ? tasks : new Array(10).fill(null);

	const [quantity, isLoadingQuantity, errorQuantityToday] = useQuantityTasksSnapshot({
		timestampStart: dateRanges.today.start,
		timestampEnd: dateRanges.today.end,
		limit: LIMIT_QUANTITY_TODAY + 1,
	});
	useNotificationError(ERRORS_MESSAGES.quantityTodayTasksLoading, errorQuantityToday);

	const quantityShort = quantity !== null ? getQuantityShort(quantity, LIMIT_QUANTITY_TODAY) : null;

	return (
		<Profile title="Сегодня" quantity={quantityShort} isLoadingQuantity={isLoadingQuantity}>
			<Section title="Задачи">
				<TasksList
					tasks={tasksToday}
					isLoading={isLoading}
					notFoundMessage={NOT_FOUND_MESSAGES.todayTasks}
					error={errorToday}
				/>
			</Section>
		</Profile>
	);
};

export default TodayPage;
