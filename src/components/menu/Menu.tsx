import cl from './Menu.module.scss';
import classNames from 'classnames';
import ButtonIcon from '../UI/buttonIcon/ButtonIcon';
import Icon from '../UI/icon/Icon';
import VisuallyHiddenLoader from '../visuallyHiddenLoader/VisuallyHiddenLoader';
import Skeleton from 'react-loading-skeleton';
import TagMarker from '../UI/tagMarker/TagMarker';
import ButtonIconText from '../UI/buttonIconText/ButtonIconText';
import useTasksSnapshot from '@/hooks/useTasksSnapshot';

import { useEffect, useId } from 'react';
import { getDateRanges } from '@/utils/date';
import { getQuantityRemainingTasks } from '@/utils/firebase';
import { showError } from '@/utils/notification';
import { Link, NavLink } from 'react-router';
import { ERRORS_MESSAGES } from '@/consts/messages';

interface MenuProps {
	isModal?: boolean;
	onClose?: React.MouseEventHandler<HTMLButtonElement>;
}

const Menu = ({ isModal = false, onClose }: MenuProps) => {
	const titleId = useId();
	const dateRanges = getDateRanges();

	const [tasksDataUpcoming, , isLoadingUpcoming, errorUpcoming] = useTasksSnapshot(
		dateRanges.nearAll.start,
		dateRanges.nearAll.end,
	);
	const tasksLengthUpcoming = tasksDataUpcoming
		? getQuantityRemainingTasks(tasksDataUpcoming)
		: null;

	useEffect(() => {
		if (!errorUpcoming) {
			return;
		}

		showError(ERRORS_MESSAGES.quantityUpcomingTasksLoading);
	}, [errorUpcoming]);

	const [tasksDataToday, , isLoadingToday, errorToday] = useTasksSnapshot(
		dateRanges.today.start,
		dateRanges.today.end,
	);
	const tasksLengthToday = tasksDataToday ? getQuantityRemainingTasks(tasksDataToday) : null;

	useEffect(() => {
		if (!errorToday) {
			return;
		}

		showError(ERRORS_MESSAGES.quantityTodayTasksLoading);
	}, [errorToday]);

	return (
		<aside className={cl.aside} aria-labelledby={titleId}>
			<div className={cl.head}>
				<h2 id={titleId} className={classNames('h2', cl.title)}>
					Меню
				</h2>
				{isModal && (
					<ButtonIcon className={cl.close} size="large" hiddenName="Меню" onClick={onClose}>
						close
					</ButtonIcon>
				)}
			</div>
			<div className={cl.main}>
				<div className={cl.section}>
					<h3 className={classNames('h3', cl.subtitle)}>Задачи</h3>
					<nav className={cl.menu}>
						<ul className={cl['menu-list']}>
							<li className={cl['menu-item']}>
								<NavLink className={cl['menu-link']} to={'/'}>
									<div className={cl['menu-name']}>
										<Icon className={cl['menu-icon']}>double_arrow</Icon>

										<span>Предстоящие</span>
									</div>
									<div className={cl['menu-quantity']}>
										<VisuallyHiddenLoader isLoading={isLoadingUpcoming}>
											{tasksLengthUpcoming !== null ? tasksLengthUpcoming : <Skeleton />}
										</VisuallyHiddenLoader>
									</div>
								</NavLink>
							</li>
							<li className={cl['menu-item']}>
								<NavLink className={cl['menu-link']} to={'other/'}>
									<div className={cl['menu-name']}>
										<Icon className={cl['menu-icon']}>list</Icon>

										<span>Сегодня</span>
									</div>
									<div className={cl['menu-quantity']}>
										<VisuallyHiddenLoader isLoading={isLoadingToday}>
											{tasksLengthToday !== null ? tasksLengthToday : <Skeleton />}
										</VisuallyHiddenLoader>
									</div>
								</NavLink>
							</li>
						</ul>
					</nav>
				</div>
				<div className={cl.section}>
					<h3 className={classNames('h3', cl.subtitle)}>Теги</h3>
					<nav className={cl.tags}>
						<ul className={cl['tags-list']}>
							<li className={cl['tags-item']}>
								<NavLink className={cl['tags-link']} to={'/'}>
									<TagMarker color="#FF0000" />

									<span className={cl['tags-name']}>Работа</span>
								</NavLink>
							</li>
							<li className={cl['tags-item']}>
								<NavLink className={cl['tags-link']} to={'other/'}>
									<TagMarker color="#FF0000" />

									<span className={cl['tags-name']}>Личное</span>
								</NavLink>
							</li>
							<li className={cl['tags-item']}>
								<NavLink className={cl['tags-link']} to={'other/'}>
									<TagMarker color="#FF0000" />

									<span className={cl['tags-name']}>
										В частности, разбавленное изрядной долей эмпатии, рациональное мышление не
										оставляет шанса для вывода текущих активов
									</span>
								</NavLink>
							</li>
						</ul>
					</nav>

					<ButtonIconText className={cl['button-add']} icon="add_circle" size="small">
						Добавить тег
					</ButtonIconText>
				</div>
			</div>

			<div className={cl.bottom}>
				<ButtonIconText className={cl.exit} icon="exit_to_app">
					Sign Out
				</ButtonIconText>

				<nav className={cl['small-menu']}>
					<ul className={cl['small-menu-list']}>
						<li className={cl['small-menu-item']}>
							<Link to={'#'} className={cl['small-menu-link']}>
								Атрибуция
							</Link>
						</li>
						<li className={cl['small-menu-item']}>
							<Link to={'#'} className={cl['small-menu-link']}>
								Cookie
							</Link>
						</li>
						<li className={cl['small-menu-item']}>
							<Link to={'#'} className={cl['small-menu-link']}>
								Политика конфиденциальности
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		</aside>
	);
};

export default Menu;
