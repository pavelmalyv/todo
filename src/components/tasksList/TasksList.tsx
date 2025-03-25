import type { Tasks } from '@/types/tasks';

import cl from './TasksList.module.scss';
import ErrorMessage from '../UI/errorMessage/ErrorMessage';
import MessageInfo from '../UI/messageInfo/MessageInfo';
import VisuallyHiddenLoader from '../visuallyHiddenLoader/VisuallyHiddenLoader';
import TaskItem from '../taskItem/TaskItem';
import { ERRORS_MESSAGES, LOADING_MESSAGES } from '@/consts/messages';

type TasksListProps = {
	tasks: Tasks | null[];
	isLoading: boolean;
	notFoundMessage: string;
	error?: Error;
	children?: React.ReactNode;
};

const TasksList = ({ tasks, isLoading, notFoundMessage, error, children }: TasksListProps) => {
	if (error) {
		return <ErrorMessage message={ERRORS_MESSAGES.tasksLoading} error={error} />;
	}

	return (
		<>
			{tasks.length === 0 ? (
				<MessageInfo message={notFoundMessage} />
			) : (
				<VisuallyHiddenLoader isLoading={isLoading} hiddenMessage={LOADING_MESSAGES.tasks}>
					<ul className={cl.list}>
						{tasks.map((task, index) => {
							const key = task ? task.id : index;

							return (
								<li className={cl.item} key={key}>
									<TaskItem task={task} />
								</li>
							);
						})}
					</ul>

					{children}
				</VisuallyHiddenLoader>
			)}
		</>
	);
};

interface ButtonProps {
	children: React.ReactNode;
}

const Button = ({ children }: ButtonProps) => {
	return <div className={cl.button}>{children}</div>;
};

TasksList.Button = Button;

export default TasksList;
