import DailyTasks from '@/components/dailyTasks/DailyTasks';

import { getDateRanges } from '@/utils/date';
import { LIMIT_TASKS, LIMIT_QUANTITY_TASKS } from '@/consts/docLimits';
import { ERRORS_MESSAGES, NOT_FOUND_MESSAGES } from '@/consts/messages';

const TodayPage = () => {
	const dateRanges = getDateRanges();

	return (
		<DailyTasks
			title="Сегодня"
			subtitle="Задачи"
			timestampStart={dateRanges.today.start}
			timestampEnd={dateRanges.today.end}
			limit={LIMIT_TASKS}
			limitQuantity={LIMIT_QUANTITY_TASKS}
			errorMessageQuantityLoading={ERRORS_MESSAGES.quantityTodayTasksLoading}
			errorMessageTasksLoading={ERRORS_MESSAGES.tasksLoading}
			notFoundMessage={NOT_FOUND_MESSAGES.todayTasks}
		/>
	);
};

export default TodayPage;
