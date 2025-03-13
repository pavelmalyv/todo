import type { SubmitHandler } from 'react-hook-form';
import type { Task } from '@/types/tasks';

import SmallForm from '@/components/Forms/smallForm/SmallForm';
import AppModal from '@/components/UI/appModal/AppModal';
import FieldDate from '@/components/UI/fieldDate/FieldDate';
import Field from '@/components/UI/field/Field';
import Checkbox from '@/components/UI/checkbox/Checkbox';
import useSaveTask from '@/hooks/useSaveTask';
import ConfirmModal from '../confirmModal/ConfirmModal';
import Button from '@/components/UI/button/Button';

import { datePickerSchema, doneTaskSchema, nameTaskSchema } from '@/schemas/fields';
import { useId, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { InferType, object } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { showError, showSuccess } from '@/utils/notification';
import { ERRORS_MESSAGES, SUCCESS_MESSAGES } from '@/consts/messages';
import useDeleteTask from '@/hooks/useDeleteTask';

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
});

const EditTaskModal = ({ initialData, isOpen, onClose }: EditTaskModalProps) => {
	const [saveTask, isLoading] = useSaveTask();
	const [isOpenConfirm, setIsOpenConfirm] = useState(false);
	const [deleteTask, isLoadingDelete] = useDeleteTask();
	const titleId = useId();

	const { control, formState, reset, handleSubmit } = useForm<EditTaskModalFormData>({
		resolver: yupResolver(editTaskModalFormSchema),
		defaultValues: {
			dueAt: new Date(initialData.dueAt.seconds * 1000),
			name: initialData.name,
			done: initialData.done,
		},
	});

	const onSubmit: SubmitHandler<EditTaskModalFormData> = async (data) => {
		try {
			const { dueAt } = data;
			if (dueAt === null) {
				throw new Error('The date field cannot be empty');
			}

			await saveTask(initialData.id, { ...data, dueAt });

			showSuccess(SUCCESS_MESSAGES.saveTask);
			onClose();
			reset(data);
		} catch (error) {
			showError(ERRORS_MESSAGES.saveTask, error);
		}
	};

	const handleDeleteTask = async () => {
		try {
			await deleteTask(initialData.id);

			onClose();
			setIsOpenConfirm(false);
			showSuccess(SUCCESS_MESSAGES.deleteTask);
		} catch (error) {
			showError(ERRORS_MESSAGES.deleteTask, error);
		}
	};

	return (
		<>
			<AppModal isOpen={isOpen} onClose={onClose} aria-labelledby={titleId}>
				<AppModal.Title id={titleId}>Редактирование задачи</AppModal.Title>

				<SmallForm
					onSubmit={handleSubmit(onSubmit)}
					isDisabledButtonName={!formState.isDirty}
					isLoading={isLoading}
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
							<Field
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

					<SmallForm.Footer>
						<AppModal.Buttons>
							<Button style="delete" isFull={true} onClick={() => setIsOpenConfirm(true)}>
								Удалить
							</Button>
							<Button
								style="border"
								isFull={true}
								onClick={() => reset()}
								disabled={!formState.isDirty}
							>
								Сбросить
							</Button>
							<Button type="submit" isFull={true} disabled={!formState.isDirty}>
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
				isLoading={isLoadingDelete}
				onClose={() => setIsOpenConfirm(false)}
				onClickConfirm={handleDeleteTask}
			/>
		</>
	);
};

export default EditTaskModal;
