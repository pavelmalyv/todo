import type { SubmitHandler } from 'react-hook-form';
import type { Task } from '@/types/tasks';

import SmallForm from '@/components/Forms/smallForm/SmallForm';
import AppModal from '@/components/UI/appModal/AppModal';
import FieldDate from '@/components/UI/Fields/fieldDate/FieldsDate';
import FieldText from '@/components/UI/Fields/fieldText/FieldText';
import Checkbox from '@/components/UI/checkbox/Checkbox';
import ConfirmModal from '../confirmModal/ConfirmModal';
import Button from '@/components/UI/Buttons/button/Button';
import TagsSelectList from '@/components/tagsSelectList/TagsSelectList';
import useTaskCRUD from '@/hooks/data/useTaskCRUD';

import {
	datePickerSchema,
	doneTaskSchema,
	nameTaskSchema,
	tagIdSchemaOptional,
} from '@/schemas/fields';
import { useEffect, useId, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { InferType, object } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { showError, showSuccess } from '@/utils/notification';
import { ERRORS_MESSAGES, SUCCESS_MESSAGES } from '@/consts/messages';

type EditTaskModalFormData = InferType<typeof editTaskModalFormSchema>;

interface EditTaskModalProps {
	initialData: Task;
	isOpen: boolean;
	onClose: () => void;
}

const editTaskModalFormSchema = object({
	dueAt: datePickerSchema,
	name: nameTaskSchema,
	done: doneTaskSchema,
	tagId: tagIdSchemaOptional,
});

const EditTaskModal = ({ initialData, isOpen, onClose }: EditTaskModalProps) => {
	const { updateTask, deleteTask } = useTaskCRUD();
	const [isOpenConfirm, setIsOpenConfirm] = useState(false);
	const titleId = useId();

	const { control, formState, reset, handleSubmit, setValue } = useForm<EditTaskModalFormData>({
		resolver: yupResolver(editTaskModalFormSchema),
	});

	useEffect(() => {
		if (formState.isDirty) {
			return;
		}

		reset({
			dueAt: new Date(initialData.dueAt.seconds * 1000),
			name: initialData.name,
			done: initialData.done,
			tagId: initialData.tagId,
		});
	}, [
		formState.isDirty,
		initialData.dueAt.seconds,
		initialData.name,
		initialData.done,
		initialData.tagId,
		reset,
	]);

	const onSubmit: SubmitHandler<EditTaskModalFormData> = async (data) => {
		try {
			const { dueAt } = data;
			if (dueAt === null) {
				throw new Error('The date field cannot be empty');
			}

			await updateTask.update(initialData.id, { ...data, dueAt });

			showSuccess(SUCCESS_MESSAGES.saveTask);
			onClose();
			reset(data);
		} catch {
			showError(ERRORS_MESSAGES.saveTask);
		}
	};

	const handleDeleteTask = async () => {
		try {
			await deleteTask.delete(initialData.id);

			onClose();
			setIsOpenConfirm(false);
			showSuccess(SUCCESS_MESSAGES.deleteTask);
		} catch {
			showError(ERRORS_MESSAGES.deleteTask);
		}
	};

	return (
		<>
			<AppModal isOpen={isOpen} onClose={onClose} aria-labelledby={titleId}>
				<AppModal.Title id={titleId}>Редактирование задачи</AppModal.Title>

				<SmallForm
					onSubmit={handleSubmit(onSubmit)}
					isDisabledButtonName={!formState.isDirty}
					isLoading={updateTask.isLoading}
				>
					<Controller
						name="dueAt"
						control={control}
						render={({ field, fieldState }) => (
							<FieldDate
								label="Дата и время выполнения"
								placeholder="Дата и время выполнения"
								aria-required={true}
								aria-invalid={fieldState.invalid}
								errorMessage={fieldState.error?.message}
								{...field}
							/>
						)}
					/>
					<Controller
						name="name"
						control={control}
						render={({ field, fieldState }) => (
							<FieldText
								label="Название"
								placeholder="Название"
								aria-required={true}
								aria-invalid={fieldState.invalid}
								errorMessage={fieldState.error?.message}
								{...field}
							/>
						)}
					/>
					<Controller
						name="done"
						control={control}
						render={({ field, fieldState }) => (
							<Checkbox
								label="Выполнено"
								aria-invalid={fieldState.invalid}
								errorMessage={fieldState.error?.message}
								{...field}
								checked={field.value}
							/>
						)}
					/>

					<Controller
						name="tagId"
						control={control}
						render={({ field, fieldState }) => (
							<TagsSelectList
								aria-invalid={fieldState.invalid}
								errorMessage={fieldState.error?.message}
								{...field}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
									const value = e.target.value;
									setValue('tagId', field.value === value ? '' : value, {
										shouldValidate: true,
										shouldDirty: true,
									});
								}}
							/>
						)}
					/>

					<SmallForm.Footer>
						<AppModal.Buttons>
							<Button styleType="delete" isFull={true} onClick={() => setIsOpenConfirm(true)}>
								Удалить
							</Button>
							<Button
								styleType="border"
								isFull={true}
								onClick={() => reset()}
								disabled={!formState.isDirty}
							>
								Сбросить
							</Button>
							<Button
								type="submit"
								isLoading={updateTask.isLoading}
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
				title="Удаление задачи"
				description="Вы уверены, что хотите удалить задачу? Это действие нельзя будет отменить"
				buttonConfirmName="Удалить"
				isOpen={isOpenConfirm}
				isLoading={deleteTask.isLoading}
				onClose={() => setIsOpenConfirm(false)}
				onClickConfirm={handleDeleteTask}
			/>
		</>
	);
};

export default EditTaskModal;
