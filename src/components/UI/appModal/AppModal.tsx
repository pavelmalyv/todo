import classNames from 'classnames';
import cl from './AppModal.module.scss';
import Modal from 'react-responsive-modal';
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
		overlay?: string;
		modalContainer?: string;
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
	const inAnimation = animation === 'fade' ? cl['fade-in'] : cl['slide-in'];
	const outAnimation = animation === 'fade' ? cl['fade-out'] : cl['slide-out'];
	const animationDurationMs = animation === 'fade' ? 200 : 600;

	return (
		<AppModalProvider value={{ onClose }}>
			<Modal
				role={role}
				open={isOpen}
				onClose={onClose}
				aria-modal="true"
				blockScroll={styleModal !== 'dialog'}
				closeOnOverlayClick={styleModal !== 'dialog'}
				classNames={{
					root: classNames(cl.root, cl[`root_${styleModal}`], className?.root),
					overlay: classNames(cl.overlay, className?.overlay),
					modalContainer: classNames(cl.container, className?.modalContainer),
					modal: classNames(cl.modal, className?.modal),
					overlayAnimationIn: cl['fade-in'],
					overlayAnimationOut: cl['fade-out'],
					modalAnimationIn: inAnimation,
					modalAnimationOut: outAnimation,
				}}
				animationDuration={animationDurationMs}
				showCloseIcon={false}
				ariaLabelledby={ariaLabelledby}
				ariaDescribedby={ariaDescribedby}
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
			<div id={id} className={classNames('h2', cl.title)}>
				{children}
			</div>
			<div className={cl.close}>
				<ButtonIcon className={cl.close} size="large" hiddenName="Закрыть" onClick={onClose}>
					close
				</ButtonIcon>
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
