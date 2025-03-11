import type { Tasks } from '@/types/tasks';
import type { User } from 'firebase/auth';

import cl from './TasksList.module.scss';
import Checkbox from '../UI/checkbox/Checkbox';
import ErrorMessage from '../UI/errorMessage/ErrorMessage';
import Skeleton from 'react-loading-skeleton';
import MessageInfo from '../UI/messageInfo/MessageInfo';
import VisuallyHiddenLoader from '../visuallyHiddenLoader/VisuallyHiddenLoader';
import ButtonIcon from '../UI/buttonIcon/ButtonIcon';
import EditTaskModal from '../Modals/editTaskModal/EditTaskModal';

import { showError } from '@/utils/notification';
import { setTaskDoc } from '@/utils/firestore';
import { useState } from 'react';
import { ERRORS_MESSAGES, LOADING_MESSAGES } from '@/consts/messages';

interface TasksListProps {
	tasks: Tasks | null[];
	user: User | null;
	isLoading: boolean;
	notFoundMessage: string;
	error?: unknown;
}

const TasksList = ({ user, tasks, isLoading, notFoundMessage, error }: TasksListProps) => {
	const [isOpenEditModals, setIsOpenEditModals] = useState<{ [key: string]: boolean }>({});

	const setIsOpenEditModal = (id: string, value: boolean) => {
		setIsOpenEditModals((prev) => ({ ...prev, [id]: value }));
	};

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
						</VisuallyHiddenLoader>
					)}
				</>
			)}
		</>
	);
};

export default TasksList;
