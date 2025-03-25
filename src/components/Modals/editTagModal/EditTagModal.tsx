import type { Tag } from '@/types/tags';

import SmallForm from '@/components/Forms/smallForm/SmallForm';
import AppModal from '@/components/UI/appModal/AppModal';
import Field from '@/components/UI/field/Field';
import FieldColor from '@/components/UI/fieldColor/FieldColor';
import Button from '@/components/UI/button/Button';
import ConfirmModal from '../confirmModal/ConfirmModal';
import useSaveTag from '@/hooks/useSaveTag';
import useDeleteTag from '@/hooks/useDeleteTag';

import { hexColorSchema, nameTagSchema } from '@/schemas/fields';
import { showError, showSuccess } from '@/utils/notification';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useId, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { InferType, object } from 'yup';
import { ERRORS_MESSAGES, SUCCESS_MESSAGES } from '@/consts/messages';

interface EditTagModalProps {
	initialData: Tag | null;
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
	const [saveTag, isLoadingSave] = useSaveTag();
	const [deleteTag, isLoadingDelete] = useDeleteTag();
	const isNoData = initialData === null;

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
			await saveTag(initialData.id, data);

			reset(data);
			onClose();
			showSuccess(SUCCESS_MESSAGES.saveTag);
		} catch (error) {
			showError(ERRORS_MESSAGES.saveTag, error);
		}
	};

	const handleDeleteTag = async () => {
		if (!initialData) {
			return;
		}

		try {
			onBeforeDelete?.();

			await deleteTag(initialData.id);

			onClose();
			setIsOpenConfirm(false);
			showSuccess(SUCCESS_MESSAGES.deleteTag);
		} catch (error) {
			showError(ERRORS_MESSAGES.deleteTag, error);
		} finally {
			onAfterDelete?.();
		}
	};

	return (
		<>
			<AppModal isOpen={isOpen} onClose={onClose} aria-labelledby={titleId}>
				<AppModal.Title id={titleId}>Редактировать тег</AppModal.Title>
				<SmallForm isLoading={isLoadingSave} onSubmit={handleSubmit(onSubmit)}>
					<Controller
						name="name"
						control={control}
						render={({ field, fieldState }) => (
							<Field
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
								style="delete"
								isFull={true}
								onClick={() => setIsOpenConfirm(true)}
							>
								Удалить
							</Button>
							<Button
								style="border"
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
								isLoading={isLoadingSave}
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
				isLoading={isLoadingDelete}
				onClose={() => setIsOpenConfirm(false)}
				onClickConfirm={handleDeleteTag}
			/>
		</>
	);
};

export default EditTagModal;
