import type { TaskId, Tasks } from '@/types/tasks';

import cl from './TasksList.module.scss';
import Checkbox from '../UI/checkbox/Checkbox';
import ErrorMessage from '../UI/errorMessage/ErrorMessage';
import Skeleton from 'react-loading-skeleton';
import MessageInfo from '../UI/messageInfo/MessageInfo';
import VisuallyHiddenLoader from '../visuallyHiddenLoader/VisuallyHiddenLoader';
import ButtonIcon from '../UI/buttonIcon/ButtonIcon';
import EditTaskModal from '../Modals/editTaskModal/EditTaskModal';

import { auth } from '@/firebase';
import { showError } from '@/utils/notification';
import { setTaskDoc } from '@/utils/firestore';
import { useState } from 'react';
import { ERRORS_MESSAGES, LOADING_MESSAGES } from '@/consts/messages';

type TasksListProps = {
	tasks: Tasks | null[];
	isLoading: boolean;
	notFoundMessage: string;
	error?: Error;
	children?: React.ReactNode;
};

const TasksList = ({ tasks, isLoading, notFoundMessage, error, children }: TasksListProps) => {
	const [isOpenEditModals, setIsOpenEditModals] = useState<{ [key: TaskId]: boolean }>({});

	const setIsOpenEditModal = (id: TaskId, value: boolean) => {
		setIsOpenEditModals((prev) => ({ ...prev, [id]: value }));
	};

	const handleChange = async (e: React.ChangeEvent<HTMLInputElement>, id: TaskId) => {
		const user = auth.currentUser;
		if (!user) {
			throw new Error('Invalid user value');
		}

		try {
			await setTaskDoc(user.uid, id, { done: e.target.checked });
		} catch (error) {
			showError(ERRORS_MESSAGES.updateTask, error);
		}
	};

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
									{task ? (
										<>
											<div className={cl.task}>
												<Checkbox
													style="through"
													label={task.name}
													checked={task.done}
													onChange={(e) => handleChange(e, task.id)}
												/>
												<ButtonIcon
													style="circle"
													hiddenName="Редактировать задачу"
													onClick={() => setIsOpenEditModal(task.id, true)}
												>
													edit
												</ButtonIcon>
											</div>

											<EditTaskModal
												initialData={task}
												isOpen={isOpenEditModals[task.id] ?? false}
												onClose={() => setIsOpenEditModal(task.id, false)}
											/>
										</>
									) : (
										<div className={cl.skeleton}>
											<Skeleton height={22} />
										</div>
									)}
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
