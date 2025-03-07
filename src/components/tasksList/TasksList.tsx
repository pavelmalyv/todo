import type { Tasks } from '@/types/tasks';
import type { User } from 'firebase/auth';

import cl from './TasksList.module.scss';
import Checkbox from '../UI/checkbox/Checkbox';
import ErrorMessage from '../UI/errorMessage/ErrorMessage';
import Skeleton from 'react-loading-skeleton';
import MessageInfo from '../UI/messageInfo/MessageInfo';

import { showError } from '@/utils/notification';
import { setTaskDoc } from '@/utils/firestore';
import { ERRORS_MESSAGES, NOT_FOUND_MESSAGES } from '@/consts/messages';

interface TasksListProps {
	tasks: Tasks | null[];
	user: User | null;
	error?: unknown;
}

const TasksList = ({ user, tasks, error }: TasksListProps) => {
	const handleChange = async (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
		try {
			if (!user) {
				throw new Error('Invalid user value');
			}

			await setTaskDoc(user.uid, id, { done: e.target.checked });
		} catch (error) {
			showError(ERRORS_MESSAGES.updateTask, error);
		}
	};

	return (
		<>
			{error ? (
				<ErrorMessage message={ERRORS_MESSAGES.tasksLoading} error={error} />
			) : (
				<>
					{tasks.length === 0 ? (
						<MessageInfo message={NOT_FOUND_MESSAGES.todayTasks} />
					) : (
						<ul className={cl.list}>
							{tasks.map((task, index) => {
								const key = task ? task.id : index;

								return (
									<li className={cl.item} key={key}>
										{task ? (
											<Checkbox
												className={cl.task}
												label={task.name}
												checked={task.done}
												onChange={(e) => handleChange(e, task.id)}
											/>
										) : (
											<div className={cl.skeleton}>
												<Skeleton height={22} />
											</div>
										)}
									</li>
								);
							})}
						</ul>
					)}
				</>
			)}
		</>
	);
};

export default TasksList;
