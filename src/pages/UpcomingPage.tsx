import type { Tasks } from '@/types/tasks';

import Profile from '@/components/profile/Profile';
import Section from '@/components/UI/section/Section';
import TasksList from '@/components/tasksList/TasksList';
import TableSections from '@/components/tableSections/TableSections';
import useTasksSnapshot from '@/hooks/useTasksSnapshot';
import useQuantityUpcomingTasksSnapshot from '@/hooks/useQuantityUpcomingTasksSnapshot';
import useShowError from '@/hooks/useShowError';
import Button from '@/components/UI/button/Button';

import { getDateRanges } from '@/utils/date';
import { ERRORS_MESSAGES, NOT_FOUND_MESSAGES } from '@/consts/messages';
import { LIMIT_UPCOMING_TASKS } from '@/consts/docLimits';
import { TODAY_TASKS_URL, TOMORROW_TASKS_URL } from '@/consts/routes';

const UpcomingPage = () => {
	const dateRanges = getDateRanges();

	const [tasksDataToday, isLoadingToday, errorToday] = useTasksSnapshot({
		timestampStart: dateRanges.today.start,
		timestampEnd: dateRanges.today.end,
		limit: LIMIT_UPCOMING_TASKS,
	});
	const tasksToday: Tasks | null[] = tasksDataToday ?? new Array(LIMIT_UPCOMING_TASKS).fill(null);

	const [tasksDataTomorrow, isLoadingTomorrow, errorTomorrow] = useTasksSnapshot({
		timestampStart: dateRanges.tomorrow.start,
		timestampEnd: dateRanges.tomorrow.end,
		limit: LIMIT_UPCOMING_TASKS,
	});
	const tasksTomorrow: Tasks | null[] =
		tasksDataTomorrow ?? new Array(LIMIT_UPCOMING_TASKS).fill(null);

	const [tasksDataNear, isLoadingNear, errorNear] = useTasksSnapshot({
		timestampStart: dateRanges.near.start,
		timestampEnd: dateRanges.near.end,
		limit: LIMIT_UPCOMING_TASKS,
	});
	const tasksNear: Tasks | null[] = tasksDataNear ?? new Array(LIMIT_UPCOMING_TASKS).fill(null);

	const [quantity, isLoadingQuantity, errorQuantity] = useQuantityUpcomingTasksSnapshot();

	useShowError(ERRORS_MESSAGES.quantityUpcomingTasksLoading, errorQuantity);

	return (
		<Profile title="Предстоящие" quantity={String(quantity)} isLoadingQuantity={isLoadingQuantity}>
			<Section title="Сегодня">
				<TasksList
					tasks={tasksToday}
					isLoading={isLoadingToday}
					notFoundMessage={NOT_FOUND_MESSAGES.todayTasks}
					error={errorToday}
				>
					{tasksDataToday?.length === LIMIT_UPCOMING_TASKS && (
						<TasksList.Button>
							<Button type="link" to={TODAY_TASKS_URL} style="border" size="small">
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
						{tasksDataTomorrow?.length === LIMIT_UPCOMING_TASKS && (
							<TasksList.Button>
								<Button type="link" to={TOMORROW_TASKS_URL} style="border" size="small">
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
						{tasksDataNear?.length === LIMIT_UPCOMING_TASKS && (
							<TasksList.Button>
								<Button type="link" to="#" style="border" size="small">
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
