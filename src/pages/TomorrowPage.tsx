import TasksPage from './TasksPage';

import { getDateRanges } from '@/utils/date';
import { LIMIT_QUANTITY_TASKS, LIMIT_TASKS } from '@/consts/docLimits';
import { ERRORS_MESSAGES, NOT_FOUND_MESSAGES } from '@/consts/messages';

const TomorrowPage = () => {
	const dateRanges = getDateRanges();

	return (
		<TasksPage
			title="Завтра"
			subtitle="Задачи"
			timestampStart={dateRanges.tomorrow.start}
			timestampEnd={dateRanges.tomorrow.end}
			limit={LIMIT_TASKS}
			limitQuantity={LIMIT_QUANTITY_TASKS}
			errorMessageQuantityLoading={ERRORS_MESSAGES.quantityTomorrowTasksLoading}
			errorMessageTasksLoading={ERRORS_MESSAGES.tasksLoading}
			notFoundMessage={NOT_FOUND_MESSAGES.tomorrowTasks}
		/>
	);
};

export default TomorrowPage;
