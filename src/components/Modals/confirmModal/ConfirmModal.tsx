import Button from '@/components/UI/button/Button';
import cl from './ConfirmModal.module.scss';
import AppModal from '@/components/UI/appModal/AppModal';

interface ConfirmModalProps {
	title: string;
	description: string;
	buttonConfirmName: string;
	isLoading: boolean;
	isOpen: boolean;
	onClose: () => void;
	onClickConfirm: React.MouseEventHandler<HTMLButtonElement>;
}

const ConfirmModal = ({
	title,
	description,
	buttonConfirmName,
	isLoading,
	isOpen,
	onClose,
	onClickConfirm,
}: ConfirmModalProps) => {
	return (
		<AppModal isOpen={isOpen} onClose={onClose}>
			<AppModal.Title>{title}</AppModal.Title>
			<AppModal.Description className={cl.description}>{description}</AppModal.Description>

			<AppModal.Buttons>
				<Button style="border" isFull={true} onClick={onClose}>
					Отмена
				</Button>
				<Button style="delete" isFull={true} onClick={onClickConfirm} isLoading={isLoading}>
					{buttonConfirmName}
				</Button>
			</AppModal.Buttons>
		</AppModal>
	);
};

export default ConfirmModal;
