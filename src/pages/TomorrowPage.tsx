import TasksPage from './TasksPage';

import { getDateRanges } from '@/utils/date';
import { ERRORS_MESSAGES, NOT_FOUND_MESSAGES } from '@/consts/messages';

const TomorrowPage = () => {
	const dateRanges = getDateRanges();

	return (
		<TasksPage
			title="Завтра"
			timestampStart={dateRanges.tomorrow.start}
			timestampEnd={dateRanges.tomorrow.end}
			errorMessageQuantityLoading={ERRORS_MESSAGES.quantityTomorrowTasksLoading}
			errorMessageTasksLoading={ERRORS_MESSAGES.tasksLoading}
			notFoundMessage={NOT_FOUND_MESSAGES.tomorrowTasks}
		/>
	);
};

export default TomorrowPage;
