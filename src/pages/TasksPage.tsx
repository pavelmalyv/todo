import type { Tasks } from '@/types/tasks';
import type { TagId } from '@/types/fields';

import Profile from '@/components/profile/Profile';
import Section from '@/components/UI/section/Section';
import TasksList from '@/components/tasksList/TasksList';
import Button from '@/components/UI/Buttons/button/Button';
import useTasksSnapshot from '@/hooks/data/useTasksSnapshot';
import useShowError from '@/hooks/ui/useShowError';

import { LIMIT_TASKS } from '@/consts/config';

interface TasksPageProps {
	title: string | null;
	isLoadingTitle?: boolean;
	timestampStart?: number;
	timestampEnd?: number;
	tagId?: TagId;
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
	errorMessageTasksLoading,
	notFoundMessage,
	headButtons,
}: TasksPageProps) => {
	const [tasks, isLoading, errorToday, { fetchMore, isLoadingMore, hasMoreData, error }] =
		useTasksSnapshot({
			timestampStart,
			timestampEnd,
			tagId,
			limit: LIMIT_TASKS,
		});

	useShowError(errorMessageTasksLoading, error);

	const tasksToday: Tasks | null[] = tasks ?? new Array(LIMIT_TASKS).fill(null);

	return (
		<Profile title={title} isLoadingTitle={isLoadingTitle} headButtons={headButtons}>
			<Section title="Задачи">
				<TasksList
					tasks={tasksToday}
					isLoading={isLoading}
					notFoundMessage={notFoundMessage}
					error={errorToday}
				>
					{hasMoreData && (
						<TasksList.Button>
							<Button styleType="border" size="small" onClick={fetchMore} isLoading={isLoadingMore}>
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
