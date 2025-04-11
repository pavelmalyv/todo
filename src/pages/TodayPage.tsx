import TasksPage from './TasksPage';

import { getDateRanges } from '@/utils/date';
import { useTitle } from '@/hooks/ui/useTitle';
import { ERRORS_MESSAGES, NOT_FOUND_MESSAGES } from '@/consts/messages';

const TodayPage = () => {
	useTitle('Задачи на сегодня');

	const dateRanges = getDateRanges();

	return (
		<TasksPage
			title="Сегодня"
			timestampStart={dateRanges.today.start}
			timestampEnd={dateRanges.today.end}
			errorMessageTasksLoading={ERRORS_MESSAGES.tasksLoading}
			notFoundMessage={NOT_FOUND_MESSAGES.todayTasks}
		/>
	);
};

export default TodayPage;
