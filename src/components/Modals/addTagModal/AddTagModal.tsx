import SmallForm from '@/components/Forms/smallForm/SmallForm';
import AppModal from '@/components/UI/appModal/AppModal';
import Field from '@/components/UI/field/Field';
import FieldColor from '@/components/UI/fieldColor/FieldColor';
import useTagsCRUD from '@/hooks/data/useTagsCRUD';

import { hexColorSchema, nameTagSchema } from '@/schemas/fields';
import { showError, showSuccess } from '@/utils/notification';
import { yupResolver } from '@hookform/resolvers/yup';
import { useId } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { InferType, object } from 'yup';
import { ERRORS_MESSAGES, SUCCESS_MESSAGES } from '@/consts/messages';

interface AddTagModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const addTagFormSchema = object({
	name: nameTagSchema,
	color: hexColorSchema,
});

type AddTagFormData = InferType<typeof addTagFormSchema>;

const AddTagModal = ({ isOpen, onClose }: AddTagModalProps) => {
	const { addTag } = useTagsCRUD();
	const titleId = useId();

	const { control, handleSubmit, reset } = useForm<AddTagFormData>({
		resolver: yupResolver(addTagFormSchema),
		defaultValues: {
			name: '',
			color: '#76DE37',
		},
	});

	const onSubmit: SubmitHandler<AddTagFormData> = async (data) => {
		try {
			await addTag.add(data);

			reset();
			onClose();
			showSuccess(SUCCESS_MESSAGES.addTag);
		} catch {
			showError(ERRORS_MESSAGES.addTag);
		}
	};

	return (
		<AppModal isOpen={isOpen} onClose={onClose} aria-labelledby={titleId}>
			<AppModal.Title id={titleId}>Добавить новый тег</AppModal.Title>
			<SmallForm
				isLoading={addTag.isLoading}
				buttonName="Добавить"
				onSubmit={handleSubmit(onSubmit)}
			>
				<Controller
					name="name"
					control={control}
					render={({ field, fieldState }) => (
						<Field
							label="Название тега"
							placeholder="Название тега"
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
							aria-required={true}
							aria-invalid={fieldState.invalid}
							errorMessage={fieldState.error?.message}
						/>
					)}
				/>
			</SmallForm>
		</AppModal>
	);
};

export default AddTagModal;
