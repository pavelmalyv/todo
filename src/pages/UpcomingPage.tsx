import Profile from '@/components/profile/Profile';
import Section from '@/components/UI/section/Section';
import TasksList from '@/components/tasksList/TasksList';
import TableSections from '@/components/tableSections/TableSections';
import useTasksSnapshot from '@/hooks/useTasksSnapshot';

const UpcomingPage = () => {
	const [tasksData, user, isLoading, error] = useTasksSnapshot();
	const tasks = tasksData ? tasksData : new Array(3).fill(null);

	return (
		<Profile title="Предстоящие" quantity={999}>
			<Section title="Сегодня">
				<TasksList tasks={tasks} user={user} isLoading={isLoading} error={error} />
			</Section>

			<TableSections>
				<Section title="Завтра">
					<TasksList tasks={tasks} user={user} isLoading={isLoading} error={error} />
				</Section>
				<Section title="На этой неделе">
					<TasksList tasks={tasks} user={user} isLoading={isLoading} error={error} />
				</Section>
			</TableSections>
		</Profile>
	);
};

export default UpcomingPage;
