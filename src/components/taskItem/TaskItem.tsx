import type { Task, TaskId } from '@/types/tasks';

import cl from './TaskItem.module.scss';
import Checkbox from '../UI/checkbox/Checkbox';
import ButtonIcon from '../UI/Buttons/buttonIcon/ButtonIcon';
import EditTaskModal from '../Modals/editTaskModal/EditTaskModal';
import Skeleton from 'react-loading-skeleton';
import useTaskCRUD from '@/hooks/data/useTaskCRUD';

import { useState } from 'react';
import { showError } from '@/utils/notification';
import { getDisplayTaskTime } from '@/utils/date';
import { ERRORS_MESSAGES } from '@/consts/messages';

interface TaskItemProps {
	task: Task | null;
}

const TaskItem = ({ task }: TaskItemProps) => {
	const { updateTask } = useTaskCRUD();
	const [isOpenEditModals, setIsOpenEditModals] = useState(false);

	const handleChangeDone = async (e: React.ChangeEvent<HTMLInputElement>, id: TaskId) => {
		try {
			await updateTask.update(id, { done: e.target.checked });
		} catch {
			showError(ERRORS_MESSAGES.updateTask);
		}
	};

	return (
		<div className={cl.item}>
			{task ? (
				<>
					<div className={cl.task}>
						<Checkbox
							className={cl.checkbox}
							styleType="through"
							label={
								<>
									<span className={cl.time}>{getDisplayTaskTime(task.dueAt.seconds)}</span>{' '}
									{task.name}
								</>
							}
							checked={task.done}
							isLoading={updateTask.isLoading}
							onChange={(e) => handleChangeDone(e, task.id)}
						/>
						<ButtonIcon
							styleType="circle"
							hiddenName="Редактировать задачу"
							onClick={() => setIsOpenEditModals(true)}
							className={cl.button}
						>
							edit
						</ButtonIcon>
					</div>

					<EditTaskModal
						initialData={task}
						isOpen={isOpenEditModals}
						onClose={() => setIsOpenEditModals(false)}
					/>
				</>
			) : (
				<div className={cl['skeleton-wrapper']}>
					<Skeleton className={cl.skeleton} />
				</div>
			)}
		</div>
	);
};

export default TaskItem;
