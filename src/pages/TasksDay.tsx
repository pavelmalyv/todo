import TasksPage from './TasksPage';

import { validateTimestampParamOrThrow } from '@/utils/error';
import { useParams } from 'react-router';
import { useTitle } from '@/hooks/ui/useTitle';
import { ERRORS_MESSAGES, NOT_FOUND_MESSAGES } from '@/consts/messages';

const TasksDay = () => {
	const params = useParams<{ timestampDay?: string }>();
	const timestamp = validateTimestampParamOrThrow(params.timestampDay);

	const startDay = new Date(timestamp);
	startDay.setHours(0, 0, 0, 0);

	const dateEnd = new Date(startDay);
	dateEnd.setDate(dateEnd.getDate() + 1);

	const dataDisplay = startDay.toLocaleDateString('ru-RU');

	useTitle(`Задачи на ${dataDisplay}`);

	return (
		<TasksPage
			title={dataDisplay}
			timestampStart={startDay.getTime()}
			timestampEnd={dateEnd.getTime()}
			errorMessageQuantityLoading={ERRORS_MESSAGES.quantityTasksLoading}
			errorMessageTasksLoading={ERRORS_MESSAGES.tasksLoading}
			notFoundMessage={NOT_FOUND_MESSAGES.tasks}
		/>
	);
};

export default TasksDay;
