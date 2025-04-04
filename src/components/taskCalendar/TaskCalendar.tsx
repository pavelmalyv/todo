import type { Task } from '@/types/tasks';

import cl from './TaskCalendar.module.scss';
import ViewTaskModal from '../Modals/viewTaskModal/ViewTaskModal';
import Skeleton from 'react-loading-skeleton';
import { useState } from 'react';
import classNames from 'classnames';

interface TaskCalendarProps {
	task: Task | null;
	isFocus: boolean;
	isEvent: boolean;
}

const TaskCalendar = ({ task, isFocus, isEvent }: TaskCalendarProps) => {
	const [isOpenTask, setIsOpenTask] = useState(false);

	return (
		<div className={cl.task}>
			{task ? (
				<>
					<button
						className={classNames(cl.button, { [cl['button_event']]: isEvent })}
						tabIndex={isFocus ? 0 : -1}
						onClick={() => setIsOpenTask(true)}
					>
						<span className={cl.body}>{task.name}</span>
					</button>

					<ViewTaskModal task={task} isOpen={isOpenTask} onClose={() => setIsOpenTask(false)} />
				</>
			) : (
				<Skeleton className={cl.skeleton} />
			)}
		</div>
	);
};

export default TaskCalendar;
