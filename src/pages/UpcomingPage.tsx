import Profile from '@/components/profile/Profile';
import Section from '@/components/UI/section/Section';
import TasksList from '@/components/tasksList/TasksList';
import useTasksSnapshot from '@/hooks/useTasksSnapshot';

const UpcomingPage = () => {
	const [tasksData, user, , error] = useTasksSnapshot();
	const tasks = tasksData ? tasksData : new Array(3).fill(null);

	return (
		<Profile title="Предстоящие" quantity={999}>
			<Section title="Сегодня">
				<TasksList tasks={tasks} user={user} error={error} />
			</Section>
		</Profile>
	);
};

export default UpcomingPage;
