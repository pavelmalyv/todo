import classNames from 'classnames';
import cl from './AppModal.module.scss';
import Modal from 'react-modal';
import ButtonIcon from '../Buttons/buttonIcon/ButtonIcon';
import { createCompoundContext } from '@/context/createCompoundContext';

interface AppModalProps {
	role?: string;
	styleModal?: 'popup' | 'full' | 'dialog';
	isOpen: boolean;
	children: React.ReactNode;
	animation?: 'fade' | 'slide';
	className?: {
		root?: string;
		container?: string;
		modal?: string;
	};
	onClose: () => void;
	'aria-labelledby'?: string;
	'aria-describedby'?: string;
}

type AppModalContext = Pick<AppModalProps, 'onClose'>;

const [useAppModalContext, AppModalProvider] = createCompoundContext<AppModalContext>();

const AppModal = ({
	role = 'dialog',
	styleModal = 'popup',
	isOpen,
	children,
	animation = 'fade',
	className,
	onClose,
	'aria-labelledby': ariaLabelledby,
	'aria-describedby': ariaDescribedby,
}: AppModalProps) => {
	return (
		<AppModalProvider value={{ onClose }}>
			<Modal
				contentRef={(node) => node?.removeAttribute('aria-modal')}
				role={role}
				isOpen={isOpen}
				onRequestClose={onClose}
				bodyOpenClassName={styleModal !== 'dialog' ? cl['body-open'] : null}
				shouldCloseOnOverlayClick={styleModal !== 'dialog'}
				className={classNames(cl.modal, className?.modal)}
				closeTimeoutMS={animation === 'fade' ? 200 : 600}
				overlayClassName={{
					base: classNames(
						cl.root,
						cl[`root_${styleModal}`],
						cl[`root_animation-${animation}`],
						className?.root,
					),

					afterOpen: cl[`root_after-open-${animation}`],
					beforeClose: cl[`root_before-close-${animation}`],
				}}
				aria={{
					labelledby: ariaLabelledby,
					describedby: ariaDescribedby,
				}}
				overlayElement={(props, contentElement) => (
					<div {...props}>
						<div className={cl.overlay}></div>
						<div className={cl.container}>{contentElement}</div>
					</div>
				)}
			>
				{children}
			</Modal>
		</AppModalProvider>
	);
};

interface TitleProps {
	id?: string;
	children: React.ReactNode;
}

const Title = ({ id, children }: TitleProps) => {
	const { onClose } = useAppModalContext();

	return (
		<>
			<div className={cl.close}>
				<ButtonIcon className={cl.close} size="large" hiddenName="Закрыть" onClick={onClose}>
					close
				</ButtonIcon>
			</div>
			<div id={id} className={classNames('h2', cl.title)}>
				{children}
			</div>
		</>
	);
};
AppModal.Title = Title;

interface ButtonsProps {
	children: React.ReactNode;
}

const Buttons = ({ children }: ButtonsProps) => {
	return <div className={cl.buttons}>{children}</div>;
};

AppModal.Buttons = Buttons;

interface DescriptionProps {
	className?: string;
	children: React.ReactNode;
}

const Description = ({ className, children }: DescriptionProps) => {
	return <div className={classNames(cl.description, className)}>{children}</div>;
};
AppModal.Description = Description;

export default AppModal;
