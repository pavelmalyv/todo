import cl from './RegistrationModal.module.scss';
import Button from '@/components/UI/button/Button';
import AppModal from '@/components/UI/appModal/AppModal';
import { useId } from 'react';

interface RegistrationModalProps {
	title: string;
	isLoading?: boolean;
	isOpen: boolean;
	children: React.ReactNode;
	onClose: () => void;
	onSubmit: React.FormEventHandler<HTMLFormElement>;
}

const RegistrationModal = ({
	title,
	isLoading,
	isOpen,
	children,
	onClose,
	onSubmit,
}: RegistrationModalProps) => {
	const titleId = useId();

	return (
		<AppModal isOpen={isOpen} aria-labelledby={titleId} onClose={onClose}>
			<AppModal.Title id={titleId}>{title}</AppModal.Title>

			<form className={cl.form} onSubmit={onSubmit} aria-labelledby={titleId}>
				{children}

				<Button type="submit" isFull={true} isLoading={isLoading}>
					Продолжить
				</Button>
			</form>
		</AppModal>
	);
};

export default RegistrationModal;
