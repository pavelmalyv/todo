import type { Tasks } from '@/types/tasks';

import Profile from '@/components/profile/Profile';
import Section from '@/components/UI/section/Section';
import TasksList from '@/components/tasksList/TasksList';
import TableSections from '@/components/tableSections/TableSections';
import Button from '@/components/UI/Buttons/button/Button';
import useTasksSnapshot from '@/hooks/data/useTasksSnapshot';
import useQuantityUpcomingTasksSnapshot from '@/hooks/data/useQuantityUpcomingTasksSnapshot';
import useShowError from '@/hooks/ui/useShowError';

import { getDateRanges } from '@/utils/date';
import { useTitle } from '@/hooks/ui/useTitle';
import { ERRORS_MESSAGES, NOT_FOUND_MESSAGES } from '@/consts/messages';
import { LIMIT_UPCOMING_TASKS } from '@/consts/config';
import { CALENDAR_URL, TODAY_TASKS_URL, TOMORROW_TASKS_URL } from '@/consts/routes';

const UpcomingPage = () => {
	useTitle('Предстоящие задачи');

	const dateRanges = getDateRanges();

	const [tasksDataToday, isLoadingToday, errorToday, { hasMoreData: taskHasMoreDataToday }] =
		useTasksSnapshot({
			timestampStart: dateRanges.today.start,
			timestampEnd: dateRanges.today.end,
			limit: LIMIT_UPCOMING_TASKS,
		});
	const tasksToday: Tasks | null[] = tasksDataToday ?? new Array(LIMIT_UPCOMING_TASKS).fill(null);

	const [
		tasksDataTomorrow,
		isLoadingTomorrow,
		errorTomorrow,
		{ hasMoreData: taskHasMoreDataTomorrow },
	] = useTasksSnapshot({
		timestampStart: dateRanges.tomorrow.start,
		timestampEnd: dateRanges.tomorrow.end,
		limit: LIMIT_UPCOMING_TASKS,
	});
	const tasksTomorrow: Tasks | null[] =
		tasksDataTomorrow ?? new Array(LIMIT_UPCOMING_TASKS).fill(null);

	const [tasksDataNear, isLoadingNear, errorNear, { hasMoreData: taskHasMoreDataNear }] =
		useTasksSnapshot({
			timestampStart: dateRanges.near.start,
			timestampEnd: dateRanges.near.end,
			limit: LIMIT_UPCOMING_TASKS,
		});
	const tasksNear: Tasks | null[] = tasksDataNear ?? new Array(LIMIT_UPCOMING_TASKS).fill(null);

	const [quantity, isLoadingQuantity, errorQuantity] = useQuantityUpcomingTasksSnapshot();

	useShowError(ERRORS_MESSAGES.quantityUpcomingTasksLoading, errorQuantity);

	return (
		<Profile title="Предстоящие" quantity={quantity} isLoadingQuantity={isLoadingQuantity}>
			<Section title="Сегодня">
				<TasksList
					tasks={tasksToday}
					isLoading={isLoadingToday}
					notFoundMessage={NOT_FOUND_MESSAGES.todayTasks}
					error={errorToday}
				>
					{taskHasMoreDataToday && (
						<TasksList.Button>
							<Button to={TODAY_TASKS_URL} styleType="border" size="small">
								Смотреть все
							</Button>
						</TasksList.Button>
					)}
				</TasksList>
			</Section>

			<TableSections>
				<Section title="Завтра">
					<TasksList
						tasks={tasksTomorrow}
						isLoading={isLoadingTomorrow}
						notFoundMessage={NOT_FOUND_MESSAGES.tomorrowTasks}
						error={errorTomorrow}
					>
						{taskHasMoreDataTomorrow && (
							<TasksList.Button>
								<Button to={TOMORROW_TASKS_URL} styleType="border" size="small">
									Смотреть все
								</Button>
							</TasksList.Button>
						)}
					</TasksList>
				</Section>
				<Section title="Ближайшие">
					<TasksList
						tasks={tasksNear}
						isLoading={isLoadingNear}
						notFoundMessage={NOT_FOUND_MESSAGES.nearTasks}
						error={errorNear}
					>
						{taskHasMoreDataNear && (
							<TasksList.Button>
								<Button to={CALENDAR_URL} styleType="border" size="small">
									Смотреть все
								</Button>
							</TasksList.Button>
						)}
					</TasksList>
				</Section>
			</TableSections>
		</Profile>
	);
};

export default UpcomingPage;
