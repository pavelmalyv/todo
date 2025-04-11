import cl from './Menu.module.scss';
import classNames from 'classnames';
import ButtonIcon from '../UI/Buttons/buttonIcon/ButtonIcon';
import Icon from '../UI/icon/Icon';
import VisuallyHiddenLoader from '../visuallyHiddenLoader/VisuallyHiddenLoader';
import Skeleton from 'react-loading-skeleton';
import TagsNav from '../tagsNav/TagsNav';
import ButtonIconText from '../UI/Buttons/buttonIconText/ButtonIconText';
import useQuantityUpcomingTasksSnapshot from '@/hooks/data/useQuantityUpcomingTasksSnapshot';
import useQuantityTasksSnapshot from '@/hooks/data/useQuantityTasksSnapshot';
import useShowError from '@/hooks/ui/useShowError';
import useUserSignOut from '@/hooks/data/useUserSignOut';

import { useId } from 'react';
import { getDateRanges } from '@/utils/date';
import { Link, NavLink } from 'react-router';
import { getQuantityShort } from '@/utils/quantity';
import { ERRORS_MESSAGES } from '@/consts/messages';
import { LIMIT_QUANTITY_TASKS } from '@/consts/docLimits';
import {
	ABOUT_URL,
	CALENDAR,
	POLICY_URL,
	TODAY_TASKS_URL,
	TOMORROW_TASKS_URL,
} from '@/consts/routes';

interface MenuProps {
	isModal?: boolean;
	onClose?: React.MouseEventHandler<HTMLButtonElement>;
}

const Menu = ({ isModal = false, onClose }: MenuProps) => {
	const titleId = useId();
	const dateRanges = getDateRanges();

	const [signOut, isLoadingSignOut, error] = useUserSignOut();
	useShowError(ERRORS_MESSAGES.signOut, error);

	const [quantityUpcoming, isLoadingQuantityUpcoming, errorQuantityUpcoming] =
		useQuantityUpcomingTasksSnapshot();
	useShowError(ERRORS_MESSAGES.quantityUpcomingTasksLoading, errorQuantityUpcoming);

	const [quantityToday, isLoadingQuantityToday, errorQuantityToday] = useQuantityTasksSnapshot({
		timestampStart: dateRanges.today.start,
		timestampEnd: dateRanges.today.end,
		limit: LIMIT_QUANTITY_TASKS + 1,
	});
	useShowError(ERRORS_MESSAGES.quantityTodayTasksLoading, errorQuantityToday);

	const [quantityTomorrow, isLoadingQuantityTomorrow, errorQuantityTomorrow] =
		useQuantityTasksSnapshot({
			timestampStart: dateRanges.tomorrow.start,
			timestampEnd: dateRanges.tomorrow.end,
			limit: LIMIT_QUANTITY_TASKS + 1,
		});
	useShowError(ERRORS_MESSAGES.quantityTomorrowTasksLoading, errorQuantityTomorrow);

	return (
		<aside
			className={classNames(cl.aside, { [cl['aside_modal']]: isModal })}
			aria-labelledby={titleId}
		>
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
										<VisuallyHiddenLoader isLoading={isLoadingQuantityUpcoming}>
											{quantityUpcoming !== null ? quantityUpcoming : <Skeleton />}
										</VisuallyHiddenLoader>
									</div>
								</NavLink>
							</li>
							<li className={cl['menu-item']}>
								<NavLink className={cl['menu-link']} to={TODAY_TASKS_URL}>
									<div className={cl['menu-name']}>
										<Icon className={cl['menu-icon']}>list</Icon>

										<span>Сегодня</span>
									</div>
									<div className={cl['menu-quantity']}>
										<VisuallyHiddenLoader isLoading={isLoadingQuantityToday}>
											{quantityToday !== null ? (
												getQuantityShort(quantityToday, LIMIT_QUANTITY_TASKS)
											) : (
												<Skeleton />
											)}
										</VisuallyHiddenLoader>
									</div>
								</NavLink>
							</li>
							<li className={cl['menu-item']}>
								<NavLink className={cl['menu-link']} to={TOMORROW_TASKS_URL}>
									<div className={cl['menu-name']}>
										<Icon className={cl['menu-icon']}>list</Icon>

										<span>Завтра</span>
									</div>
									<div className={cl['menu-quantity']}>
										<VisuallyHiddenLoader isLoading={isLoadingQuantityTomorrow}>
											{quantityTomorrow !== null ? (
												getQuantityShort(quantityTomorrow, LIMIT_QUANTITY_TASKS)
											) : (
												<Skeleton />
											)}
										</VisuallyHiddenLoader>
									</div>
								</NavLink>
							</li>
							<li className={cl['menu-item']}>
								<NavLink className={cl['menu-link']} to={CALENDAR}>
									<div className={cl['menu-name']}>
										<Icon className={cl['menu-icon']}>calendar_month</Icon>

										<span>Календарь</span>
									</div>
								</NavLink>
							</li>
						</ul>
					</nav>
				</div>
				<div className={cl.section}>
					<h3 className={classNames('h3', cl.subtitle)}>Теги</h3>

					<TagsNav />
				</div>
			</div>

			<div className={cl.bottom}>
				<ButtonIconText
					disabled={isLoadingSignOut}
					className={cl.exit}
					icon="exit_to_app"
					onClick={signOut}
				>
					Выйти
				</ButtonIconText>

				<nav className={cl['small-menu']}>
					<ul className={cl['small-menu-list']}>
						<li className={cl['small-menu-item']}>
							<Link to={ABOUT_URL} className={cl['small-menu-link']}>
								О проекте
							</Link>
						</li>
						<li className={cl['small-menu-item']}>
							<Link to={POLICY_URL} target="_blank" className={cl['small-menu-link']}>
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
