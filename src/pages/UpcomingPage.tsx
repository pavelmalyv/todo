import Profile from '@/components/profile/Profile';
import Section from '@/components/UI/section/Section';
import TasksList from '@/components/tasksList/TasksList';
import TableSections from '@/components/tableSections/TableSections';
import useTasksSnapshot from '@/hooks/useTasksSnapshot';

import { getDateRanges } from '@/utils/date';
import { getQuantityRemainingTasks } from '@/utils/firebase';
import { NOT_FOUND_MESSAGES } from '@/consts/messages';

const LIMIT = 4;

const UpcomingPage = () => {
	const dateRanges = getDateRanges();

	const [tasksDataToday, userToday, isLoadingToday, errorToday] = useTasksSnapshot({
		timestampStart: dateRanges.today.start,
		timestampEnd: dateRanges.today.end,
		limit: LIMIT,
	});
	const tasksToday = tasksDataToday ? tasksDataToday : new Array(LIMIT).fill(null);

	const [tasksDataTomorrow, userTomorrow, isLoadingTomorrow, errorTomorrow] = useTasksSnapshot({
		timestampStart: dateRanges.tomorrow.start,
		timestampEnd: dateRanges.tomorrow.end,
		limit: LIMIT,
	});
	const tasksTomorrow = tasksDataTomorrow ? tasksDataTomorrow : new Array(LIMIT).fill(null);

	const [tasksDataNear, userNear, isLoadingNear, errorNear] = useTasksSnapshot({
		timestampStart: dateRanges.near.start,
		timestampEnd: dateRanges.near.end,
		limit: LIMIT,
	});
	const tasksNear = tasksDataNear ? tasksDataNear : new Array(LIMIT).fill(null);

	let quantity: null | number = null;
	const isLoadingQuantity = isLoadingToday || isLoadingTomorrow || isLoadingNear;

	if (tasksDataToday && tasksDataTomorrow && tasksDataNear) {
		quantity =
			getQuantityRemainingTasks(tasksDataToday) +
			getQuantityRemainingTasks(tasksDataTomorrow) +
			getQuantityRemainingTasks(tasksDataNear);
	}

	return (
		<Profile title="Предстоящие" quantity={quantity} isLoadingQuantity={isLoadingQuantity}>
			<Section title="Сегодня">
				<TasksList
					tasks={tasksToday}
					user={userToday}
					isLoading={isLoadingToday}
					isVisibleMore={tasksDataToday?.length === LIMIT}
					moreTo="#"
					notFoundMessage={NOT_FOUND_MESSAGES.todayTasks}
					error={errorToday}
				/>
			</Section>

			<TableSections>
				<Section title="Завтра">
					<TasksList
						tasks={tasksTomorrow}
						user={userTomorrow}
						isLoading={isLoadingTomorrow}
						isVisibleMore={tasksDataTomorrow?.length === LIMIT}
						moreTo="#"
						notFoundMessage={NOT_FOUND_MESSAGES.tomorrowTasks}
						error={errorTomorrow}
					/>
				</Section>
				<Section title="Ближайшие">
					<TasksList
						tasks={tasksNear}
						user={userNear}
						isLoading={isLoadingNear}
						isVisibleMore={tasksDataNear?.length === LIMIT}
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
