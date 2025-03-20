import type { Tasks } from '@/types/tasks';
import type { TagId } from '@/types/fields';

import Profile from '@/components/profile/Profile';
import Section from '@/components/UI/section/Section';
import TasksList from '@/components/tasksList/TasksList';
import Button from '@/components/UI/button/Button';
import useTasksSnapshot from '@/hooks/useTasksSnapshot';
import useQuantityTasksSnapshot from '@/hooks/useQuantityTasksSnapshot';
import useNotificationError from '@/hooks/useNotificationError';

import { getQuantityShort } from '@/utils/quantity';
import { showError } from '@/utils/notification';
import { useId } from 'react';
import { LIMIT_QUANTITY_TASKS, LIMIT_TASKS } from '@/consts/docLimits';

interface TasksPageProps {
	title: string | null;
	isLoadingTitle?: boolean;
	timestampStart?: number;
	timestampEnd?: number;
	tagId?: TagId;
	errorMessageQuantityLoading: string;
	errorMessageTasksLoading: string;
	notFoundMessage: string;
	headButtons?: React.ReactNode;
}

const TasksPage = ({
	title,
	isLoadingTitle,
	timestampStart,
	timestampEnd,
	tagId,
	errorMessageQuantityLoading,
	errorMessageTasksLoading,
	notFoundMessage,
	headButtons,
}: TasksPageProps) => {
	const [tasks, isLoading, errorToday, { fetchMore, isLoadingMore, hasMoreData }] =
		useTasksSnapshot({
			timestampStart,
			timestampEnd,
			tagId,
			limit: LIMIT_TASKS,
		});

	const tasksToday: Tasks | null[] = tasks ?? new Array(LIMIT_TASKS).fill(null);
	const [quantity, isLoadingQuantity, errorQuantityToday] = useQuantityTasksSnapshot({
		timestampStart,
		timestampEnd,
		tagId,
		limit: LIMIT_QUANTITY_TASKS + 1,
	});

	useNotificationError(errorMessageQuantityLoading, errorQuantityToday);

	const handleFetchMore = () => {
		try {
			fetchMore();
		} catch (error) {
			showError(errorMessageTasksLoading, error);
		}
	};

	const quantityShort = quantity !== null ? getQuantityShort(quantity, LIMIT_QUANTITY_TASKS) : null;
	const titleId = useId();

	return (
		<Profile
			title={title}
			isLoadingTitle={isLoadingTitle}
			quantity={quantityShort}
			isLoadingQuantity={isLoadingQuantity}
			headButtons={headButtons}
		>
			<Section title="Задачи" titleId={titleId}>
				<TasksList
					tasks={tasksToday}
					isLoading={isLoading}
					notFoundMessage={notFoundMessage}
					error={errorToday}
					aria-labelledby={titleId}
				>
					{hasMoreData && (
						<TasksList.Button>
							<Button
								style="border"
								size="small"
								onClick={handleFetchMore}
								isLoading={isLoadingMore}
							>
								Загрузить еще
							</Button>
						</TasksList.Button>
					)}
				</TasksList>
			</Section>
		</Profile>
	);
};

export default TasksPage;
