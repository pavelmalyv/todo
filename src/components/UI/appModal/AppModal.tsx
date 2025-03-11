import classNames from 'classnames';
import cl from './AppModal.module.scss';
import Modal from 'react-responsive-modal';
import ButtonIcon from '../buttonIcon/ButtonIcon';
import { createCompoundContext } from '@/context/createCompoundContext';

interface AppModalProps {
	styleModal?: 'popup' | 'full';
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
	styleModal = 'popup',
	isOpen,
	children,
	animation = 'fade',
	className,
	onClose,
	'aria-labelledby': ariaLabelledby,
	'aria-describedby': ariaDescribedby,
}: AppModalProps) => {
	const fadeInAnimation = animation === 'fade' ? cl['fade-in'] : cl['slide-in'];
	const fadeOutAnimation = animation === 'fade' ? cl['fade-out'] : cl['slide-out'];
	const animationDurationMs = animation === 'fade' ? 200 : 600;

	return (
		<AppModalProvider value={{ onClose }}>
			<Modal
				open={isOpen}
				onClose={onClose}
				classNames={{
					root: classNames(cl.root, cl[`root_${styleModal}`], className?.root),
					overlay: classNames(cl.overlay, className?.overlay),
					modalContainer: classNames(cl.container, className?.modalContainer),
					modal: classNames(cl.modal, className?.modal),
					overlayAnimationIn: fadeInAnimation,
					overlayAnimationOut: fadeOutAnimation,
					modalAnimationIn: fadeInAnimation,
					modalAnimationOut: fadeOutAnimation,
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
			<ButtonIcon size="large" className={cl.close} hiddenName="Закрыть" onClick={onClose}>
				close
			</ButtonIcon>
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

export default AppModal;
