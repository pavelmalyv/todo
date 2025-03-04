import cl from './Profile.module.scss';
import classNames from 'classnames';
import ButtonIconText from '../UI/buttonIconText/ButtonIconText';
import ButtonIcon from '../UI/buttonIcon/ButtonIcon';
import AppModal from '../UI/appModal/AppModal';
import Icon from '../UI/icon/Icon';
import TagMarker from '../UI/tagMarker/TagMarker';

import { Link, NavLink } from 'react-router';
import { useEffect, useId, useRef, useState } from 'react';
import { throttle } from 'lodash';

interface AsideProps {
	isModal?: boolean;
	onClose?: React.MouseEventHandler<HTMLButtonElement>;
}

const Aside = ({ isModal = false, onClose }: AsideProps) => {
	const titleId = useId();

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
									<div className={cl['menu-quantity']}>00+</div>
								</NavLink>
							</li>
							<li className={cl['menu-item']}>
								<NavLink className={cl['menu-link']} to={'other/'}>
									<div className={cl['menu-name']}>
										<Icon className={cl['menu-icon']}>list</Icon>

										<span>Сегодня</span>
									</div>
									<div className={cl['menu-quantity']}>1</div>
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

interface ProfileProps {
	title: string;
	quantity?: number;
	children: React.ReactNode;
}

const Profile = ({ title, quantity, children }: ProfileProps) => {
	const profileRef = useRef<HTMLDivElement | null>(null);
	const [isOpenSidebar, setIsOpenSidebar] = useState(false);

	const handleClose = () => {
		setIsOpenSidebar(false);
	};

	useEffect(() => {
		const profile = profileRef.current;

		if (!isOpenSidebar || !profile) {
			return;
		}

		const handleResize = () => {
			const breakpointHidden = parseInt(
				getComputedStyle(profile).getPropertyValue('--breakpoint-hidden-menu'),
				10,
			);

			if (window.innerWidth > breakpointHidden) {
				setIsOpenSidebar(false);
			}
		};
		const handleResizeThrottled = throttle(handleResize, 200);

		window.addEventListener('resize', handleResizeThrottled);

		return () => window.removeEventListener('resize', handleResizeThrottled);
	}, [isOpenSidebar]);

	return (
		<>
			<div className={classNames('container', cl.profile)} ref={profileRef}>
				<div className={cl.body}>
					<div className={cl.sidebar}>
						<Aside />
					</div>

					<div className={cl.page}>
						<div className={cl['page-head']}>
							<div className={cl['page-burger']}>
								<ButtonIcon size="large" hiddenName="Меню" onClick={() => setIsOpenSidebar(true)}>
									Menu
								</ButtonIcon>
							</div>
							<div className={cl['page-title']}>
								<h1 className="h2">{title}</h1>
								{quantity && (
									<div className={cl['page-quantity']}>{quantity > 99 ? '99+' : quantity}</div>
								)}
							</div>
						</div>
						{children}
					</div>
				</div>
			</div>

			<AppModal
				styleModal="full"
				isOpen={isOpenSidebar}
				animation="slide"
				className={{
					root: cl['sidebar-dialog'],
					modalContainer: cl['sidebar-dialog-container'],
				}}
				onClose={handleClose}
			>
				<Aside isModal={true} onClose={handleClose} />
			</AppModal>
		</>
	);
};

export default Profile;
