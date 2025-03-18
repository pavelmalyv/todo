import DailyTasks from '@/components/dailyTasks/DailyTasks';

import { getDateRanges } from '@/utils/date';
import { LIMIT_QUANTITY_TODAY, LIMIT_TODAY } from '@/consts/docLimits';
import { ERRORS_MESSAGES, NOT_FOUND_MESSAGES } from '@/consts/messages';

const TodayPage = () => {
	const dateRanges = getDateRanges();

	return (
		<DailyTasks
			title="Сегодня"
			subtitle="Задачи"
			timestampStart={dateRanges.today.start}
			timestampEnd={dateRanges.today.end}
			limit={LIMIT_TODAY}
			limitQuantity={LIMIT_QUANTITY_TODAY}
			errorMessageQuantityLoading={ERRORS_MESSAGES.quantityTodayTasksLoading}
			errorMessageTasksLoading={ERRORS_MESSAGES.tasksLoading}
			notFoundMessage={NOT_FOUND_MESSAGES.todayTasks}
		/>
	);
};

export default TodayPage;
