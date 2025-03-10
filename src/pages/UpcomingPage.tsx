import Profile from '@/components/profile/Profile';
import Section from '@/components/UI/section/Section';
import TasksList from '@/components/tasksList/TasksList';
import TableSections from '@/components/tableSections/TableSections';
import useTasksSnapshot from '@/hooks/useTasksSnapshot';

import { getDateRanges } from '@/utils/date';
import { getQuantityRemainingTasks } from '@/utils/firebase';
import { NOT_FOUND_MESSAGES } from '@/consts/messages';

const UpcomingPage = () => {
	const dateRanges = getDateRanges();

	const [tasksDataToday, userToday, isLoadingToday, errorToday] = useTasksSnapshot(
		dateRanges.today.start,
		dateRanges.today.end,
	);
	const tasksToday = tasksDataToday ? tasksDataToday : new Array(3).fill(null);

	const [tasksDataTomorrow, userTomorrow, isLoadingTomorrow, errorTomorrow] = useTasksSnapshot(
		dateRanges.tomorrow.start,
		dateRanges.tomorrow.end,
	);
	const tasksTomorrow = tasksDataTomorrow ? tasksDataTomorrow : new Array(3).fill(null);

	const [tasksDataNear, userNear, isLoadingNear, errorNear] = useTasksSnapshot(
		dateRanges.near.start,
		dateRanges.near.end,
	);
	const tasksNear = tasksDataNear ? tasksDataNear : new Array(3).fill(null);

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
						notFoundMessage={NOT_FOUND_MESSAGES.tomorrowTasks}
						error={errorTomorrow}
					/>
				</Section>
				<Section title="Ближайшие">
					<TasksList
						tasks={tasksNear}
						user={userNear}
						isLoading={isLoadingNear}
						notFoundMessage={NOT_FOUND_MESSAGES.nearTasks}
						error={errorNear}
					/>
				</Section>
			</TableSections>
		</Profile>
	);
};

export default UpcomingPage;
