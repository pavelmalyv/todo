import type { DaysFocus } from '@/types/calendar';
import type { Tasks } from '@/types/tasks';

import classNames from 'classnames';
import cl from './DayCalendar.module.scss';
import VisuallyHiddenLoader from '../visuallyHiddenLoader/VisuallyHiddenLoader';
import Skeleton from 'react-loading-skeleton';
import ErrorMessage from '../UI/errorMessage/ErrorMessage';
import ViewTaskModal from '../Modals/viewTaskModal/ViewTaskModal';
import useTasksSnapshot from '@/hooks/useTasksSnapshot';

import { Link } from 'react-router';
import { produce } from 'immer';
import { memo, useEffect, useRef, useState } from 'react';
import { getTasksDayUrl } from '@/consts/routes';
import { LIMIT_CALENDAR_TASKS } from '@/consts/docLimits';
import { ERRORS_MESSAGES, LOADING_MESSAGES } from '@/consts/messages';

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
		const [isOpenTask, setIsOpenTask] = useState(false);

		const dateEnd = new Date(timestamp);
		dateEnd.setDate(dateEnd.getDate() + 1);

		const [tasksData, isLoading, error, { hasMoreData }] = useTasksSnapshot({
			timestampStart: timestamp,
			timestampEnd: dateEnd.getTime(),
			limit: LIMIT_CALENDAR_TASKS,
		});

		const tasks: Tasks | null[] = tasksData ? tasksData : new Array(1).fill(null);

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
			const dayElement = dayRef.current;
			if (!dayElement) {
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

			const cellElement = dayElement.closest(`.${classNameCell}`);
			if (!cellElement) {
				return;
			}

			observer.observe(cellElement, { attributes: true, attributeFilter: ['tabindex'] });
		}, [classNameCell]);

		return (
			<div className={classNames(className, cl.day)} ref={dayRef} data-id={timestamp}>
				<div className={cl['day-number']}>{day}</div>

				{error ? (
					<ErrorMessage message={ERRORS_MESSAGES.tasksLoadingShort} error={error} />
				) : (
					<VisuallyHiddenLoader isLoading={isLoading} hiddenMessage={LOADING_MESSAGES.tasks}>
						{tasks.length > 0 && (
							<div className={cl.tasks}>
								<ul className={cl.list}>
									{tasks.map((task, index) => (
										<li className={cl.item} key={task?.id ?? index}>
											{task ? (
												<>
													<button
														className={cl.task}
														tabIndex={isFocus ? 0 : -1}
														onClick={() => setIsOpenTask(true)}
													>
														<span className={cl['task-body']}>{task.name}</span>
													</button>

													<ViewTaskModal
														task={task}
														isOpen={isOpenTask}
														onClose={() => setIsOpenTask(false)}
													/>
												</>
											) : (
												<Skeleton className={cl.skeleton} />
											)}
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
