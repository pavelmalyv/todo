import type { Task, TaskId } from '@/types/tasks';

import cl from './TaskItem.module.scss';
import Checkbox from '../UI/checkbox/Checkbox';
import ButtonIcon from '../UI/buttonIcon/ButtonIcon';
import EditTaskModal from '../Modals/editTaskModal/EditTaskModal';
import Skeleton from 'react-loading-skeleton';
import useSetDoneTask from '@/hooks/useSetDoneTask';

import { useState } from 'react';
import { showError } from '@/utils/notification';
import { ERRORS_MESSAGES } from '@/consts/messages';

interface TaskItemProps {
	task: Task | null;
}

const TaskItem = ({ task }: TaskItemProps) => {
	const [setDoneTask, isLoadingDone] = useSetDoneTask();
	const [isOpenEditModals, setIsOpenEditModals] = useState(false);

	const handleChangeDone = async (e: React.ChangeEvent<HTMLInputElement>, id: TaskId) => {
		try {
			setDoneTask(id, e.target.checked);
		} catch (error) {
			showError(ERRORS_MESSAGES.updateTask, error);
		}
	};

	return (
		<div className={cl.item}>
			{task ? (
				<>
					<div className={cl.task}>
						<Checkbox
							style="through"
							label={task.name}
							checked={task.done}
							isLoading={isLoadingDone}
							onChange={(e) => handleChangeDone(e, task.id)}
						/>
						<ButtonIcon
							style="circle"
							hiddenName="Редактировать задачу"
							onClick={() => setIsOpenEditModals(true)}
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
