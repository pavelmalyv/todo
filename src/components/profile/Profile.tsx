import cl from './Profile.module.scss';
import classNames from 'classnames';
import ButtonIcon from '../UI/Buttons/buttonIcon/ButtonIcon';
import AppModal from '../UI/appModal/AppModal';
import Skeleton from 'react-loading-skeleton';
import VisuallyHiddenLoader from '../visuallyHiddenLoader/VisuallyHiddenLoader';
import Button from '../UI/Buttons/button/Button';
import Menu from '../menu/Menu';
import AddTaskModal from '../Modals/addTaskModal/AddTaskModal';

import { useEffect, useRef, useState } from 'react';
import { throttle } from 'lodash';

type ProfileProps = {
	title: string | null;
	isLoadingTitle?: boolean;
	children: React.ReactNode;
	headButtons?: React.ReactNode;
	isAddButton?: boolean;
} & (
	| {
			quantity: string | number | null;
			isLoadingQuantity?: boolean;
	  }
	| {
			quantity?: never;
			isLoadingQuantity?: never;
	  }
);

const Profile = ({
	title,
	isLoadingTitle = false,
	quantity,
	isLoadingQuantity = false,
	children,
	headButtons,
	isAddButton = true,
}: ProfileProps) => {
	const profileRef = useRef<HTMLDivElement | null>(null);
	const [isOpenSidebar, setIsOpenSidebar] = useState(false);
	const [isOpenTaskModal, setIsOpenTaskModal] = useState(false);

	const handleTaskModalClose = () => {
		setIsOpenTaskModal(false);
	};

	const handleSidebarClose = () => {
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
					<div className={cl.page}>
						<div className={cl.head}>
							<div className={cl.main}>
								<div className={cl.burger}>
									<ButtonIcon size="large" hiddenName="Меню" onClick={() => setIsOpenSidebar(true)}>
										Menu
									</ButtonIcon>
								</div>
								<div className={cl.title}>
									<h1 className="h1">
										<VisuallyHiddenLoader isLoading={isLoadingTitle}>
											{title ? title : <Skeleton width={160} />}
										</VisuallyHiddenLoader>
									</h1>
									{quantity !== undefined && (
										<div className={cl.quantity}>
											<VisuallyHiddenLoader isLoading={isLoadingQuantity}>
												{quantity !== null ? (
													quantity
												) : (
													<div className={cl['quantity-skeleton']}>
														<Skeleton />
													</div>
												)}
											</VisuallyHiddenLoader>
										</div>
									)}
								</div>
							</div>
							<div className={cl.buttons}>
								{headButtons}

								{isAddButton && (
									<Button
										className={cl.button}
										size="small"
										styleType="border"
										onClick={() => setIsOpenTaskModal(true)}
									>
										Добавить задачу
									</Button>
								)}
							</div>
						</div>
						<div>{children}</div>
					</div>

					<div className={cl.sidebar}>
						<Menu />
					</div>
				</div>
			</div>

			<AppModal
				styleModal="full"
				isOpen={isOpenSidebar}
				animation="slide"
				className={{
					modal: cl['sidebar-dialog'],
				}}
				onClose={handleSidebarClose}
			>
				<Menu isModal={true} onClose={handleSidebarClose} />
			</AppModal>

			<AddTaskModal isOpen={isOpenTaskModal} onClose={handleTaskModalClose} />
		</>
	);
};

export default Profile;
