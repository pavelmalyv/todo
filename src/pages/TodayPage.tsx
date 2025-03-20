import TasksPage from './TasksPage';

import { getDateRanges } from '@/utils/date';
import { ERRORS_MESSAGES, NOT_FOUND_MESSAGES } from '@/consts/messages';

const TodayPage = () => {
	const dateRanges = getDateRanges();

	return (
		<TasksPage
			title="Сегодня"
			timestampStart={dateRanges.today.start}
			timestampEnd={dateRanges.today.end}
			errorMessageQuantityLoading={ERRORS_MESSAGES.quantityTodayTasksLoading}
			errorMessageTasksLoading={ERRORS_MESSAGES.tasksLoading}
			notFoundMessage={NOT_FOUND_MESSAGES.todayTasks}
		/>
	);
};

export default TodayPage;
