import TasksPage from './TasksPage';
import Button from '@/components/UI/button/Button';
import useTagSnapshot from '@/hooks/useTagSnapshot';
import useNotificationError from '@/hooks/useNotificationError';

import { requiredParamOrThrow } from '@/utils/error';
import { useParams } from 'react-router';
import { ERRORS_MESSAGES, NOT_FOUND_MESSAGES } from '@/consts/messages';

const TagPage = () => {
	const params = useParams<{ id?: string }>();
	const id = requiredParamOrThrow(params.id);
	const [tag, isLoading, error] = useTagSnapshot(id);

	useNotificationError(ERRORS_MESSAGES.tagNameLoading, error);

	return (
		<TasksPage
			title={tag?.name ?? null}
			isLoadingTitle={isLoading}
			errorMessageQuantityLoading={ERRORS_MESSAGES.quantityTasksLoading}
			errorMessageTasksLoading={ERRORS_MESSAGES.tasksLoading}
			notFoundMessage={NOT_FOUND_MESSAGES.tasks}
			tagId={id}
			headButtons={
				<Button size="small" style="border">
					Редактировать тег
				</Button>
			}
		/>
	);
};

export default TagPage;
