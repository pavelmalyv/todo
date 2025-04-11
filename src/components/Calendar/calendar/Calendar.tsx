import type {
	DatesSetArg,
	DayCellContentArg,
	EventClickArg,
	EventSourceInput,
	MoreLinkArg,
	MoreLinkMountArg,
	ViewMountArg,
} from '@fullcalendar/core/index.js';

import classNames from 'classnames';
import cl from './Calendar.module.scss';
import FullCalendar from '@fullcalendar/react';
import DayCell from '../dayCell/DayCell';
import EventItem from '../eventItem/EventItem';
import dayGridPlugin from '@fullcalendar/daygrid';
import ruLocale from '@fullcalendar/core/locales/ru';
import useTasksSnapshotLazy from '@/hooks/data/useTasksSnapshotLazy';

import { useEffect, useMemo, useRef } from 'react';
import { v4 as uiud } from 'uuid';
import { getTasksDayUrl } from '@/consts/routes';
import { useNavigate } from 'react-router';
import { LIMIT_CALENDAR_TASKS } from '@/consts/config';

const KEY = uiud();
const EVENT_HEIGHT = 17;
const CLASS_DAY_CELL_BODY = 'day-' + uiud();

const getDaysFromRange = (start: Date, end: Date) => {
	const days: number[] = [];
	const currentDate = new Date(start);

	while (currentDate <= end) {
		days.push(currentDate.getTime());
		currentDate.setDate(currentDate.getDate() + 1);
	}

	return days;
};

const diffDaysSet = (prev: number[], next: number[]) => {
	const added = next.filter((day) => !prev.includes(day));
	const removed = prev.filter((day) => !next.includes(day));

	return { added, removed };
};

const getHtmlElement = (element: HTMLElement, selector: string) => {
	const resultEl = element.querySelector<HTMLElement>(selector);
	if (!resultEl) {
		console.error(`Element with selector "${selector}" not found`);
	}

	return resultEl;
};

const Calendar = () => {
	const navigate = useNavigate();
	const prevDaysSetRef = useRef<number[]>([]);
	const [tasksDays, createTasksDay, deleteTasksDay] = useTasksSnapshotLazy();

	useEffect(() => {
		return () => {
			prevDaysSetRef.current = [];
		};
	}, []);

	const handleDatesSet = (date: DatesSetArg) => {
		const dateEnd = new Date(date.end);
		dateEnd.setDate(dateEnd.getDate() - 1);

		const prevDaysSet = prevDaysSetRef.current;
		const nextDaysSet = getDaysFromRange(date.start, dateEnd);
		prevDaysSetRef.current = nextDaysSet;

		const { added, removed } = diffDaysSet(prevDaysSet, nextDaysSet);

		added.forEach(async (day) => {
			const dateEnd = new Date(day);
			dateEnd.setDate(dateEnd.getDate() + 1);

			await createTasksDay({
				id: day,
				timestampStart: day,
				timestampEnd: dateEnd.getTime(),
				limit: LIMIT_CALENDAR_TASKS + 1,
			});
		});

		removed.forEach((day) => deleteTasksDay(day));
	};

	const events = useMemo(() => {
		const events: EventSourceInput = [];

		for (const key in tasksDays) {
			tasksDays[key].tasks?.forEach((task) => {
				const dateStart = new Date(task.dueAt.seconds * 1000);
				const dateEnd = new Date(dateStart);
				dateEnd.setSeconds(dateEnd.getSeconds() + 1);

				events.push({
					title: task.name,
					start: dateStart,
					end: dateEnd,
					extendedProps: {
						task: task,
					},
				});
			});
		}

		return events;
	}, [tasksDays]);

	const renderDay = ({ date, dayNumberText }: DayCellContentArg) => {
		const timestamp = date.getTime();
		const tasksDay: (typeof tasksDays)[keyof typeof tasksDays] | undefined = tasksDays[timestamp];

		return (
			<DayCell
				dayText={dayNumberText}
				isSkeleton={tasksDay ? tasksDay.tasks === null : true}
				isLoading={tasksDay ? tasksDay.isLoading : true}
				error={tasksDay?.error}
				skeletonHeight={EVENT_HEIGHT}
			/>
		);
	};

	const handleMoreClick = (linkInfo: MoreLinkArg) => {
		const dateLocal = new Date(
			linkInfo.date.getUTCFullYear(),
			linkInfo.date.getUTCMonth(),
			linkInfo.date.getUTCDate(),
		);
		const url = getTasksDayUrl(dateLocal.getTime());
		navigate(url);

		return '_';
	};

	const handleEventClick = (event: EventClickArg) => {
		const bodyElement = getHtmlElement(event.el, `.${CLASS_DAY_CELL_BODY}`);
		if (!bodyElement) {
			return;
		}

		bodyElement.click();
	};

	const handleMoreMount = (moreMount: MoreLinkMountArg) => {
		moreMount.el.removeAttribute('role');
	};

	const handleViewMount = (mountArgs: ViewMountArg) => {
		const gridTableElement = getHtmlElement(
			mountArgs.el,
			'.fc-scrollgrid-sync-table[role="presentation"]',
		);

		if (gridTableElement) {
			gridTableElement.removeAttribute('role');
		}

		const gridBodyElement = getHtmlElement(
			mountArgs.el,
			'.fc-scrollgrid-section-body[role="presentation"]',
		);
		if (gridBodyElement) {
			gridBodyElement.removeAttribute('role');
		}

		const gridTdElement = getHtmlElement(
			mountArgs.el,
			'.fc-scrollgrid-section-body td[role="presentation"]',
		);
		if (gridTdElement) {
			gridTdElement.removeAttribute('role');
		}

		const gridHeaderElement = getHtmlElement(
			mountArgs.el,
			'.fc-scrollgrid-section-header[role="presentation"]',
		);
		if (gridHeaderElement) {
			gridHeaderElement.removeAttribute('role');
		}

		const headerElement = getHtmlElement(mountArgs.el, '.fc-col-header[role="presentation"]');
		if (headerElement) {
			headerElement.removeAttribute('role');
		}
	};

	return (
		<FullCalendar
			key={KEY}
			height="auto"
			events={events}
			plugins={[dayGridPlugin]}
			initialView="dayGridMonth"
			locale={ruLocale}
			dayCellClassNames={cl.cell}
			viewClassNames={cl.view}
			viewDidMount={handleViewMount}
			datesSet={handleDatesSet}
			dayCellContent={renderDay}
			eventClick={handleEventClick}
			eventInteractive={true}
			eventClassNames={cl.event}
			dayMaxEvents={LIMIT_CALENDAR_TASKS}
			moreLinkContent="+ Еще"
			moreLinkHint="Еще задачи"
			moreLinkClassNames={classNames('link', cl.more)}
			moreLinkClick={handleMoreClick}
			moreLinkDidMount={handleMoreMount}
			buttonText={{
				today: 'Текущий месяц',
			}}
			buttonHints={{
				prev: 'Предыдущий месяц',
				next: 'Следующий месяц',
			}}
			eventContent={(eventContent) => (
				<EventItem
					className={CLASS_DAY_CELL_BODY}
					eventContent={eventContent}
					height={EVENT_HEIGHT}
				/>
			)}
		/>
	);
};

export default Calendar;
