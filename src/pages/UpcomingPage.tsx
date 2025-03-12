import Profile from '@/components/profile/Profile';
import Section from '@/components/UI/section/Section';
import TasksList from '@/components/tasksList/TasksList';
import TableSections from '@/components/tableSections/TableSections';
import useTasksSnapshot from '@/hooks/useTasksSnapshot';
import useQuantityUpcomingTasksSnapshot from '@/hooks/useQuantityUpcomingTasksSnapshot';

import { showError } from '@/utils/notification';
import { useEffect } from 'react';
import { getDateRanges } from '@/utils/date';
import { ERRORS_MESSAGES, NOT_FOUND_MESSAGES } from '@/consts/messages';
import { LIMIT_UPCOMING_TASKS } from '@/consts/docLimits';

const UpcomingPage = () => {
	const dateRanges = getDateRanges();

	const [tasksDataToday, isLoadingToday, errorToday] = useTasksSnapshot({
		timestampStart: dateRanges.today.start,
		timestampEnd: dateRanges.today.end,
		limit: LIMIT_UPCOMING_TASKS,
	});
	const tasksToday = tasksDataToday ? tasksDataToday : new Array(LIMIT_UPCOMING_TASKS).fill(null);

	const [tasksDataTomorrow, isLoadingTomorrow, errorTomorrow] = useTasksSnapshot({
		timestampStart: dateRanges.tomorrow.start,
		timestampEnd: dateRanges.tomorrow.end,
		limit: LIMIT_UPCOMING_TASKS,
	});
	const tasksTomorrow = tasksDataTomorrow
		? tasksDataTomorrow
		: new Array(LIMIT_UPCOMING_TASKS).fill(null);

	const [tasksDataNear, isLoadingNear, errorNear] = useTasksSnapshot({
		timestampStart: dateRanges.near.start,
		timestampEnd: dateRanges.near.end,
		limit: LIMIT_UPCOMING_TASKS,
	});
	const tasksNear = tasksDataNear ? tasksDataNear : new Array(LIMIT_UPCOMING_TASKS).fill(null);

	const [quantity, isLoadingQuantity, errorQuantity] = useQuantityUpcomingTasksSnapshot();

	useEffect(() => {
		if (!errorQuantity) {
			return;
		}

		showError(ERRORS_MESSAGES.quantityUpcomingTasksLoading, errorQuantity);
	}, [errorQuantity]);

	return (
		<Profile title="Предстоящие" quantity={quantity} isLoadingQuantity={isLoadingQuantity}>
			<Section title="Сегодня">
				<TasksList
					tasks={tasksToday}
					isLoading={isLoadingToday}
					isVisibleMore={tasksDataToday?.length === LIMIT_UPCOMING_TASKS}
					moreTo="#"
					notFoundMessage={NOT_FOUND_MESSAGES.todayTasks}
					error={errorToday}
				/>
			</Section>

			<TableSections>
				<Section title="Завтра">
					<TasksList
						tasks={tasksTomorrow}
						isLoading={isLoadingTomorrow}
						isVisibleMore={tasksDataTomorrow?.length === LIMIT_UPCOMING_TASKS}
						moreTo="#"
						notFoundMessage={NOT_FOUND_MESSAGES.tomorrowTasks}
						error={errorTomorrow}
					/>
				</Section>
				<Section title="Ближайшие">
					<TasksList
						tasks={tasksNear}
						isLoading={isLoadingNear}
						isVisibleMore={tasksDataNear?.length === LIMIT_UPCOMING_TASKS}
						moreTo="#"
						notFoundMessage={NOT_FOUND_MESSAGES.nearTasks}
						error={errorNear}
					/>
				</Section>
			</TableSections>
		</Profile>
	);
};

export default UpcomingPage;
