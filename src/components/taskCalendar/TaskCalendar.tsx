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

	const handleClick = () => {
		setIsOpenTask(true);
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			handleClick();
		}
	};

	return (
		<div className={cl.task}>
			{task ? (
				<>
					<button
						className={classNames(cl.button, { [cl['button_event']]: isEvent })}
						tabIndex={isFocus ? 0 : -1}
						onClick={handleClick}
						onKeyDown={handleKeyDown}
					>
						<span className={cl.body}>{task.name}</span>
					</button>

					<div onKeyDown={(e) => e.stopPropagation()}>
						<ViewTaskModal task={task} isOpen={isOpenTask} onClose={() => setIsOpenTask(false)} />
					</div>
				</>
			) : (
				<Skeleton className={cl.skeleton} />
			)}
		</div>
	);
};

export default TaskCalendar;
