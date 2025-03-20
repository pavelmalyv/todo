import type { Tasks } from '@/types/tasks';

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

interface TasksPageProps {
	title: string;
	subtitle: string;
	timestampStart: number;
	timestampEnd: number;
	limit: number;
	limitQuantity: number;
	errorMessageQuantityLoading: string;
	errorMessageTasksLoading: string;
	notFoundMessage: string;
}

const TasksPage = ({
	title,
	subtitle,
	timestampStart,
	timestampEnd,
	limit,
	limitQuantity,
	errorMessageQuantityLoading,
	errorMessageTasksLoading,
	notFoundMessage,
}: TasksPageProps) => {
	const [tasks, isLoading, errorToday, { fetchMore, isLoadingMore, hasMoreData }] =
		useTasksSnapshot({
			timestampStart,
			timestampEnd,
			limit,
		});

	const tasksToday: Tasks | null[] = tasks ?? new Array(limit).fill(null);
	const [quantity, isLoadingQuantity, errorQuantityToday] = useQuantityTasksSnapshot({
		timestampStart,
		timestampEnd,
		limit: limitQuantity + 1,
	});

	useNotificationError(errorMessageQuantityLoading, errorQuantityToday);

	const handleFetchMore = () => {
		try {
			fetchMore();
		} catch (error) {
			showError(errorMessageTasksLoading, error);
		}
	};

	const quantityShort = quantity !== null ? getQuantityShort(quantity, limitQuantity) : null;
	const titleId = useId();

	return (
		<Profile title={title} quantity={quantityShort} isLoadingQuantity={isLoadingQuantity}>
			<Section title={subtitle} titleId={titleId}>
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
