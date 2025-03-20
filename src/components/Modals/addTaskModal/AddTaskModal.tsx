import type { SubmitHandler } from 'react-hook-form';

import SmallForm from '@/components/Forms/smallForm/SmallForm';
import AppModal from '@/components/UI/appModal/AppModal';
import Field from '@/components/UI/field/Field';
import FieldDate from '@/components/UI/fieldDate/FieldDate';
import TagsSelectList from '@/components/tagsSelectList/TagsSelectList';
import useAddTask from '@/hooks/useAddTask';

import { ChangeEvent, useId } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InferType, object } from 'yup';
import { datePickerSchema, nameTaskSchema, tagIdSchemaOptional } from '@/schemas/fields';
import { showError, showSuccess } from '@/utils/notification';
import { ERRORS_MESSAGES, SUCCESS_MESSAGES } from '@/consts/messages';

interface AddTaskModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const addTaskFormSchema = object({
	dueAt: datePickerSchema,
	name: nameTaskSchema,
	tagId: tagIdSchemaOptional,
});

type AddTaskFormData = InferType<typeof addTaskFormSchema>;

const AddTaskModal = ({ isOpen, onClose }: AddTaskModalProps) => {
	const [addTask, isLoading] = useAddTask();

	const titleId = useId();
	const { control, reset, handleSubmit, setValue } = useForm<AddTaskFormData>({
		defaultValues: {
			dueAt: null,
			name: '',
			tagId: '',
		},
		resolver: yupResolver(addTaskFormSchema),
	});

	const onSubmit: SubmitHandler<AddTaskFormData> = async (data) => {
		try {
			const { dueAt } = data;
			if (dueAt === null) {
				throw new Error('The date field cannot be empty');
			}

			await addTask({
				...data,
				dueAt: dueAt,
				done: false,
			});

			reset();
			onClose();
			showSuccess(SUCCESS_MESSAGES.addTask);
		} catch (error) {
			showError(ERRORS_MESSAGES.addTask, error);
		}
	};

	return (
		<AppModal isOpen={isOpen} onClose={onClose} aria-labelledby={titleId}>
			<AppModal.Title id={titleId}>Добавить задачу</AppModal.Title>
			<SmallForm buttonName="Добавить" onSubmit={handleSubmit(onSubmit)} isLoading={isLoading}>
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
					name="tagId"
					control={control}
					render={({ field, fieldState }) => (
						<TagsSelectList
							aria-invalid={fieldState.invalid}
							errorMessage={fieldState.error?.message}
							{...field}
							onChange={(e: ChangeEvent<HTMLInputElement>) => {
								const value = e.target.value;
								setValue('tagId', field.value === value ? '' : value);
							}}
						/>
					)}
				/>
			</SmallForm>
		</AppModal>
	);
};

export default AddTaskModal;
