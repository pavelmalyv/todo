import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import cl from './AppModal.module.scss';
import Icon from '../icon/Icon';
import classNames from 'classnames';

interface AppModalProps {
	isOpen: boolean;
	children: React.ReactNode;
	onClose: () => void;
	'aria-labelledby'?: string;
	'aria-describedby'?: string;
}

const AppModal = ({
	isOpen,
	children,
	onClose,
	'aria-labelledby': ariaLabelledby,
	'aria-describedby': ariaDescribedby,
}: AppModalProps) => {
	const closeIcon = (
		<>
			<span className="visually-hidden">Закрыть</span>
			<Icon>close</Icon>
		</>
	);

	return (
		<Modal
			center
			open={isOpen}
			onClose={onClose}
			classNames={{
				root: cl.root,
				overlay: cl.overlay,
				modalContainer: cl.container,
				modal: cl.modal,
				closeButton: cl.close,
				overlayAnimationIn: cl['fade-in'],
				overlayAnimationOut: cl['fade-out'],
				modalAnimationIn: cl['fade-in'],
				modalAnimationOut: cl['fade-out'],
			}}
			animationDuration={200}
			closeIcon={closeIcon}
			ariaLabelledby={ariaLabelledby}
			ariaDescribedby={ariaDescribedby}
		>
			{children}
		</Modal>
	);
};

interface TitleProps {
	id?: string;
	children: React.ReactNode;
}

const Title = ({ id, children }: TitleProps) => {
	return (
		<div id={id} className={classNames('h2', cl.title)}>
			{children}
		</div>
	);
};

AppModal.Title = Title;

export default AppModal;
