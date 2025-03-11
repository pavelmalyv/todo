import type { SubmitHandler } from 'react-hook-form';
import type { Task } from '@/types/tasks';

import SmallForm from '@/components/Forms/smallForm/SmallForm';
import AppModal from '@/components/UI/appModal/AppModal';
import FieldDate from '@/components/UI/fieldDate/FieldDate';
import Field from '@/components/UI/field/Field';

import { datePickerSchema, doneTaskSchema, nameTaskSchema } from '@/schemas/fields';
import { useId } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { InferType, object } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Checkbox from '@/components/UI/checkbox/Checkbox';

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
	const titleId = useId();

	const { control, formState, handleSubmit } = useForm<EditTaskModalFormData>({
		resolver: yupResolver(editTaskModalFormSchema),
		defaultValues: {
			dueAt: new Date(initialData.dueAt.seconds * 1000),
			name: initialData.name,
			done: initialData.done,
		},
	});

	const onSubmit: SubmitHandler<EditTaskModalFormData> = (data) => {
		console.log(data);
	};

	return (
		<AppModal isOpen={isOpen} onClose={onClose} aria-labelledby={titleId}>
			<AppModal.Title id={titleId}>Редактирование задачи</AppModal.Title>

			<SmallForm
				buttonName="Обновить"
				deleteButtonName="Удалить"
				deleteButtonOnClick={() => {}}
				onSubmit={handleSubmit(onSubmit)}
				isDisabledButtonName={!formState.isDirty}
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
			</SmallForm>
		</AppModal>
	);
};

export default EditTaskModal;
