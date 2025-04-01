import type { Tasks } from '@/types/tasks';
import type { TagId } from '@/types/fields';

import Profile from '@/components/profile/Profile';
import Section from '@/components/UI/section/Section';
import TasksList from '@/components/tasksList/TasksList';
import Button from '@/components/UI/Buttons/button/Button';
import useTasksSnapshot from '@/hooks/data/useTasksSnapshot';
import useQuantityTasksSnapshot from '@/hooks/data/useQuantityTasksSnapshot';
import useShowError from '@/hooks/ui/useShowError';

import { getQuantityShort } from '@/utils/quantity';
import { showError } from '@/utils/notification';
import { LIMIT_QUANTITY_TASKS, LIMIT_TASKS } from '@/consts/config';

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

	useShowError(errorMessageQuantityLoading, errorQuantityToday);

	const handleFetchMore = () => {
		try {
			fetchMore();
		} catch {
			showError(errorMessageTasksLoading);
		}
	};

	const quantityShort = quantity !== null ? getQuantityShort(quantity, LIMIT_QUANTITY_TASKS) : null;

	return (
		<Profile
			title={title}
			isLoadingTitle={isLoadingTitle}
			quantity={quantityShort}
			isLoadingQuantity={isLoadingQuantity}
			headButtons={headButtons}
		>
			<Section title="Задачи">
				<TasksList
					tasks={tasksToday}
					isLoading={isLoading}
					notFoundMessage={notFoundMessage}
					error={errorToday}
				>
					{hasMoreData && (
						<TasksList.Button>
							<Button
								styleType="border"
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
