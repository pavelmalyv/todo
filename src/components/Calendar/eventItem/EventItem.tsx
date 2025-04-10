import type { EventContentArg } from '@fullcalendar/core/index.js';
import type { Task } from '@/types/tasks';

import classNames from 'classnames';
import cl from './EventItem.module.scss';
import ViewTaskModal from '@/components/Modals/viewTaskModal/ViewTaskModal';
import { useState } from 'react';

interface EventItemProps {
	className: string;
	eventContent: EventContentArg;
	height: number;
}

const EventItem = ({ className, eventContent, height }: EventItemProps) => {
	const [isOpenTask, setIsOpenTask] = useState(false);
	const { timeText, event } = eventContent;

	const task = event.extendedProps.task as Task | undefined;
	return (
		<>
			<div
				className={classNames(cl.event, className)}
				onClick={() => setIsOpenTask(true)}
				style={{ height: height }}
			>
				<span className={cl.body}>
					{timeText} <span className={cl.title}>{event.title}</span>
				</span>
			</div>

			{task && (
				<div onKeyDown={(e) => e.stopPropagation()}>
					<ViewTaskModal task={task} isOpen={isOpenTask} onClose={() => setIsOpenTask(false)} />
				</div>
			)}
		</>
	);
};

export default EventItem;
