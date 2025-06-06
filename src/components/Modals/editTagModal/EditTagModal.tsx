import type { Tag } from '@/types/tags';

import SmallForm from '@/components/Forms/smallForm/SmallForm';
import AppModal from '@/components/UI/appModal/AppModal';
import FieldText from '@/components/UI/Fields/fieldText/FieldText';
import FieldColor from '@/components/UI/Fields/fieldColor/FieldColor';
import Button from '@/components/UI/Buttons/button/Button';
import ConfirmModal from '../confirmModal/ConfirmModal';
import useTagsCRUD from '@/hooks/data/useTagsCRUD';

import { hexColorSchema, nameTagSchema } from '@/schemas/fields';
import { showError, showSuccess } from '@/utils/notification';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useId, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { InferType, object } from 'yup';
import { ERRORS_MESSAGES, SUCCESS_MESSAGES } from '@/consts/messages';

interface EditTagModalProps {
	initialData: Tag | null | undefined;
	isLoadingData?: boolean;
	isOpen: boolean;
	onClose: () => void;
	onBeforeDelete?: () => void;
	onAfterDelete?: () => void;
}

const editTagFormSchema = object({
	name: nameTagSchema,
	color: hexColorSchema,
});

type EditTagFormData = InferType<typeof editTagFormSchema>;

const EditTagModal = ({
	initialData,
	isLoadingData = false,
	isOpen,
	onClose,
	onBeforeDelete,
	onAfterDelete,
}: EditTagModalProps) => {
	const titleId = useId();
	const [isOpenConfirm, setIsOpenConfirm] = useState(false);
	const { updateTag, deleteTag } = useTagsCRUD();
	const isNoData = initialData === null || initialData === undefined;

	const { control, formState, handleSubmit, reset } = useForm<EditTagFormData>({
		resolver: yupResolver(editTagFormSchema),
	});

	useEffect(() => {
		if (formState.isDirty) {
			return;
		}

		reset({
			name: initialData?.name ?? '',
			color: initialData?.color ?? '',
		});
	}, [formState.isDirty, initialData?.name, initialData?.color, reset]);

	const onSubmit: SubmitHandler<EditTagFormData> = async (data) => {
		if (!initialData) {
			return;
		}

		try {
			await updateTag.update(initialData.id, data);

			reset(data);
			onClose();
			showSuccess(SUCCESS_MESSAGES.saveTag);
		} catch {
			showError(ERRORS_MESSAGES.saveTag);
		}
	};

	const handleDeleteTag = async () => {
		if (!initialData) {
			return;
		}

		try {
			onBeforeDelete?.();

			await deleteTag.delete(initialData.id);

			onClose();
			setIsOpenConfirm(false);
			showSuccess(SUCCESS_MESSAGES.deleteTag);
		} catch {
			showError(ERRORS_MESSAGES.deleteTag);
		} finally {
			onAfterDelete?.();
		}
	};

	return (
		<>
			<AppModal isOpen={isOpen} onClose={onClose} aria-labelledby={titleId}>
				<AppModal.Title id={titleId}>Редактировать тег</AppModal.Title>
				<SmallForm isLoading={updateTag.isLoading} onSubmit={handleSubmit(onSubmit)}>
					<Controller
						name="name"
						control={control}
						render={({ field, fieldState }) => (
							<FieldText
								label="Название тега"
								placeholder="Название тега"
								isLoading={isLoadingData}
								isSkeleton={isNoData}
								aria-required={true}
								aria-invalid={fieldState.invalid}
								errorMessage={fieldState.error?.message}
								{...field}
							/>
						)}
					/>

					<Controller
						name="color"
						control={control}
						render={({ field, fieldState }) => (
							<FieldColor
								label="Цвет:"
								ref={field.ref}
								name={field.name}
								value={field.value}
								onChange={field.onChange}
								isLoading={isLoadingData}
								isSkeleton={isNoData}
								aria-required={true}
								aria-invalid={fieldState.invalid}
								errorMessage={fieldState.error?.message}
							/>
						)}
					/>

					<SmallForm.Footer>
						<AppModal.Buttons>
							<Button
								isSkeleton={isNoData}
								isLoadingSkeleton={isLoadingData}
								styleType="delete"
								isFull={true}
								onClick={() => setIsOpenConfirm(true)}
							>
								Удалить
							</Button>
							<Button
								styleType="border"
								isSkeleton={isNoData}
								isLoadingSkeleton={isLoadingData}
								isFull={true}
								onClick={() => reset()}
								disabled={!formState.isDirty}
							>
								Сбросить
							</Button>
							<Button
								type="submit"
								isLoading={updateTag.isLoading}
								isSkeleton={isNoData}
								isLoadingSkeleton={isLoadingData}
								isFull={true}
								disabled={!formState.isDirty}
							>
								Обновить
							</Button>
						</AppModal.Buttons>
					</SmallForm.Footer>
				</SmallForm>
			</AppModal>

			<ConfirmModal
				title="Удаление тега"
				description="Вы уверены, что хотите удалить тег? Это действие нельзя будет отменить"
				buttonConfirmName="Удалить"
				isOpen={isOpenConfirm}
				isLoading={deleteTag.isLoading}
				onClose={() => setIsOpenConfirm(false)}
				onClickConfirm={handleDeleteTag}
			/>
		</>
	);
};

export default EditTagModal;
