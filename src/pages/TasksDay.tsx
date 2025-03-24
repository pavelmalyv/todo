import TasksPage from './TasksPage';

import { validateTimestampParamOrThrow } from '@/utils/error';
import { useParams } from 'react-router';
import { ERRORS_MESSAGES, NOT_FOUND_MESSAGES } from '@/consts/messages';

const TasksDay = () => {
	const params = useParams<{ timestampDay?: string }>();
	const timestamp = validateTimestampParamOrThrow(params.timestampDay);

	const dateEnd = new Date(timestamp);
	dateEnd.setDate(dateEnd.getDate() + 1);

	const date = new Date(timestamp);
	return (
		<TasksPage
			title={date.toLocaleDateString('ru-RU')}
			timestampStart={timestamp}
			timestampEnd={dateEnd.getTime()}
			errorMessageQuantityLoading={ERRORS_MESSAGES.quantityTasksLoading}
			errorMessageTasksLoading={ERRORS_MESSAGES.tasksLoading}
			notFoundMessage={NOT_FOUND_MESSAGES.tasks}
		/>
	);
};

export default TasksDay;
