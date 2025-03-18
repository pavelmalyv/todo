import DailyTasks from '@/components/dailyTasks/DailyTasks';

import { getDateRanges } from '@/utils/date';
import { LIMIT_QUANTITY_TASKS, LIMIT_DAY_TASKS } from '@/consts/docLimits';
import { ERRORS_MESSAGES, NOT_FOUND_MESSAGES } from '@/consts/messages';

const TomorrowPage = () => {
	const dateRanges = getDateRanges();

	return (
		<DailyTasks
			title="Завтра"
			subtitle="Задачи"
			timestampStart={dateRanges.tomorrow.start}
			timestampEnd={dateRanges.tomorrow.end}
			limit={LIMIT_DAY_TASKS}
			limitQuantity={LIMIT_QUANTITY_TASKS}
			errorMessageQuantityLoading={ERRORS_MESSAGES.quantityTomorrowTasksLoading}
			errorMessageTasksLoading={ERRORS_MESSAGES.tasksLoading}
			notFoundMessage={NOT_FOUND_MESSAGES.tomorrowTasks}
		/>
	);
};

export default TomorrowPage;
