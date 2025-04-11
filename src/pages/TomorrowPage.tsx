import TasksPage from './TasksPage';

import { getDateRanges } from '@/utils/date';
import { useTitle } from '@/hooks/ui/useTitle';
import { ERRORS_MESSAGES, NOT_FOUND_MESSAGES } from '@/consts/messages';

const TomorrowPage = () => {
	useTitle('Задачи на завтра');

	const dateRanges = getDateRanges();

	return (
		<TasksPage
			title="Завтра"
			timestampStart={dateRanges.tomorrow.start}
			timestampEnd={dateRanges.tomorrow.end}
			errorMessageTasksLoading={ERRORS_MESSAGES.tasksLoading}
			notFoundMessage={NOT_FOUND_MESSAGES.tomorrowTasks}
		/>
	);
};

export default TomorrowPage;
