import type { DaysFocus } from '@/types/calendar';
import type { Tasks } from '@/types/tasks';

import classNames from 'classnames';
import cl from './DayCalendar.module.scss';
import VisuallyHiddenLoader from '../visuallyHiddenLoader/VisuallyHiddenLoader';
import ErrorMessage from '../UI/errorMessage/ErrorMessage';
import TaskCalendar from '../taskCalendar/TaskCalendar';
import useTasksSnapshot from '@/hooks/data/useTasksSnapshot';

import { Link } from 'react-router';
import { produce } from 'immer';
import { memo, useCallback, useEffect, useRef } from 'react';
import { getTasksDayUrl } from '@/consts/routes';
import { LIMIT_CALENDAR_TASKS } from '@/consts/config';
import { ERRORS_MESSAGES, LOADING_MESSAGES, NOT_FOUND_MESSAGES } from '@/consts/messages';
import { getWordForm } from '@/utils/words';

interface DayCalendarProps {
	day: number;
	timestamp: number;
	isFocus: boolean;
	classNameCell: string;
	className?: string;
	setDaysFocus: React.Dispatch<React.SetStateAction<DaysFocus>>;
}

const DayCalendar = memo(
	({ day, timestamp, isFocus, className, classNameCell, setDaysFocus }: DayCalendarProps) => {
		const dayRef = useRef<HTMLDivElement | null>(null);
		const defaultLabelRef = useRef<string | null>(null);

		const dateEnd = new Date(timestamp);
		dateEnd.setDate(dateEnd.getDate() + 1);

		const [tasksData, isLoading, error, { hasMoreData }] = useTasksSnapshot({
			timestampStart: timestamp,
			timestampEnd: dateEnd.getTime(),
			limit: LIMIT_CALENDAR_TASKS,
		});

		const tasks: Tasks | null[] = tasksData ? tasksData : new Array(1).fill(null);

		const getCellElement = useCallback(() => {
			const dayElement = dayRef.current;
			if (!dayElement) {
				return undefined;
			}

			const cellElement = dayElement.closest(`.${classNameCell}`);
			if (!cellElement) {
				return undefined;
			}

			return cellElement;
		}, [classNameCell]);

		useEffect(() => {
			setDaysFocus(
				produce((draft) => {
					draft[`${timestamp}`] = false;
				}),
			);

			return () => {
				setDaysFocus(
					produce((draft) => {
						delete draft[timestamp];
					}),
				);
			};
		}, [timestamp, setDaysFocus]);

		useEffect(() => {
			const cellElement = getCellElement();
			if (!cellElement) {
				return;
			}

			const observer = new MutationObserver((mutationRecords) => {
				mutationRecords.forEach(({ target }) => {
					if (!(target instanceof HTMLElement)) {
						return;
					}

					if (target.getAttribute('tabindex') !== '0') {
						return;
					}

					target.focus();

					const scrollContainerElement = target.closest('.react-datepicker__month-container');
					if (scrollContainerElement) {
						const scrollContainerRect = scrollContainerElement.getBoundingClientRect();
						const targetRect = target.getBoundingClientRect();
						const offsetLeft =
							targetRect.right - scrollContainerRect.right + scrollContainerElement.scrollLeft;

						scrollContainerElement.scrollTo({
							left: offsetLeft,
							behavior: 'smooth',
						});
					}
				});
			});

			observer.observe(cellElement, { attributes: true, attributeFilter: ['tabindex'] });
		}, [getCellElement]);

		useEffect(() => {
			const cellElement = getCellElement();
			if (!cellElement) {
				return;
			}

			if (!tasksData) {
				return;
			}

			let defaultLabel = defaultLabelRef.current;

			if (!defaultLabel) {
				let label = cellElement.getAttribute('aria-label') ?? '';
				label = label.replace('Choose ', '');

				defaultLabelRef.current = label;
				defaultLabel = label;
			}

			let labelTasks;
			const taskCount = tasksData.length;
			if (taskCount > 0) {
				labelTasks = hasMoreData ? 'больше ' : '';
				labelTasks += `${taskCount} ${getWordForm(taskCount, 'задача', 'задачи', 'задач')}`;
			} else {
				labelTasks = NOT_FOUND_MESSAGES.tasks;
			}

			cellElement.setAttribute('aria-label', `${defaultLabel}: ${labelTasks}`);
		}, [getCellElement, tasksData, hasMoreData]);

		useEffect(() => {
			const cellElement = getCellElement();
			if (!cellElement) {
				return;
			}

			cellElement.removeAttribute('role');
			cellElement.removeAttribute('aria-selected');

			if (cellElement.classList.contains('react-datepicker__day--outside-month')) {
				cellElement.setAttribute('aria-hidden', 'true');
			} else {
				cellElement.removeAttribute('aria-hidden');
			}
		}, [getCellElement]);

		return (
			<div className={classNames(className, cl.day)} ref={dayRef} data-id={timestamp}>
				<div className={cl['day-number']}>{day}</div>

				{error ? (
					<ErrorMessage message={ERRORS_MESSAGES.tasksLoadingShort} />
				) : (
					<VisuallyHiddenLoader isLoading={isLoading} hiddenMessage={LOADING_MESSAGES.tasks}>
						{tasks.length > 0 && (
							<div className={cl.tasks}>
								<ul className={cl.list}>
									{tasks.map((task, index) => (
										<li key={task?.id ?? index}>
											<TaskCalendar task={task} isFocus={isFocus} isEvent={index % 2 === 0} />
										</li>
									))}
								</ul>

								{hasMoreData && (
									<Link
										to={getTasksDayUrl(timestamp)}
										className={classNames('link', cl.more)}
										tabIndex={isFocus ? 0 : -1}
									>
										Ещё
									</Link>
								)}
							</div>
						)}
					</VisuallyHiddenLoader>
				)}
			</div>
		);
	},
);

export default DayCalendar;
