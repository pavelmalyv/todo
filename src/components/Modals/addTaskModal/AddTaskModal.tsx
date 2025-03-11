import SmallForm from '@/components/Forms/smallForm/SmallForm';
import AppModal from '@/components/UI/appModal/AppModal';
import Field from '@/components/UI/field/Field';
import FieldDate from '@/components/UI/fieldDate/FieldDate';
import TagsSelect from '@/components/UI/tagsSelect/TagsSelect';

import { useId } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InferType, object } from 'yup';
import { dataSchema, nameTaskSchema } from '@/schemas/fields';

interface AddTaskModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const addTaskFormSchema = object({
	datetime: dataSchema,
	name: nameTaskSchema,
});

type AddTaskFormData = InferType<typeof addTaskFormSchema>;

const AddTaskModal = ({ isOpen, onClose }: AddTaskModalProps) => {
	const titleId = useId();
	const { control, handleSubmit } = useForm<AddTaskFormData>({
		defaultValues: {
			datetime: null,
name: '',
		},
		resolver: yupResolver(addTaskFormSchema),
	});

	const onSubmit: SubmitHandler<AddTaskFormData> = async (data) => {
		console.log(data);
	};

	return (
		<AppModal isOpen={isOpen} onClose={onClose} aria-labelledby={titleId}>
			<AppModal.Title id={titleId}>Добавить задачу</AppModal.Title>
			<SmallForm buttonName="Добавить" onSubmit={handleSubmit(onSubmit)}>
				<Controller
					name="datetime"
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

				<TagsSelect>
					<TagsSelect.Tag color="#FF0000">Работа</TagsSelect.Tag>
					<TagsSelect.Tag color="#61FF00">Личное</TagsSelect.Tag>
					<TagsSelect.Tag color="#FFB700">Учеба</TagsSelect.Tag>
					<TagsSelect.Tag color="#5D7DF0">В частности, разбавленное изрядной</TagsSelect.Tag>
				</TagsSelect>
			</SmallForm>
		</AppModal>
	);
};

export default AddTaskModal;
