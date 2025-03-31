import type { SubmitHandler } from 'react-hook-form';

import SmallForm from '../Forms/smallForm/SmallForm';
import FieldText from '../UI/Fields/fieldText/FieldText';
import useConfirmPasswordReset from '@/hooks/data/useConfirmPasswordReset';

import { Controller, useForm } from 'react-hook-form';
import { getPasswordRepeatSchema, passwordCreateSchema } from '@/schemas/fields';
import { InferType, object } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { getErrorMessageFirebase } from '@/utils/firebase';
import { useNavigate } from 'react-router';
import { showSuccess } from '@/utils/notification';
import { LOGIN_URL } from '@/consts/routes';
import { SUCCESS_MESSAGES } from '@/consts/messages';

interface ConfirmPasswordResetProps {
	code: string;
}

const confirmFormSchema = object({
	password: passwordCreateSchema,
	passwordRepeat: getPasswordRepeatSchema('password'),
});

type ConfirmFormData = InferType<typeof confirmFormSchema>;

const ConfirmPasswordReset = ({ code }: ConfirmPasswordResetProps) => {
	const navigate = useNavigate();
	const [confirmPasswordReset, isLoading, error] = useConfirmPasswordReset();
	const errorMessage = error ? getErrorMessageFirebase(error) : undefined;

	const { handleSubmit, control, reset } = useForm<ConfirmFormData>({
		resolver: yupResolver(confirmFormSchema),
		defaultValues: {
			password: '',
			passwordRepeat: '',
		},
	});

	const onSubmit: SubmitHandler<ConfirmFormData> = async (data) => {
		await confirmPasswordReset(code, data.password);

		showSuccess(SUCCESS_MESSAGES.confirmPasswordReset);
		navigate(LOGIN_URL);
		reset();
	};

	return (
		<SmallForm
			onSubmit={handleSubmit(onSubmit)}
			buttonName="Сохранить"
			errorMessage={errorMessage}
			isLoading={isLoading}
		>
			<Controller
				name="password"
				control={control}
				render={({ field, fieldState }) => (
					<FieldText
						label="Пароль"
						placeholder="Пароль*"
						isPassword={true}
						autoComplete="new-password"
						{...field}
						aria-required={true}
						aria-invalid={fieldState.invalid}
						errorMessage={fieldState.error?.message}
					/>
				)}
			/>
			<Controller
				name="passwordRepeat"
				control={control}
				render={({ field, fieldState }) => (
					<FieldText
						label="Повтор пароля"
						placeholder="Повтор пароля*"
						isPassword={true}
						autoComplete="new-password"
						{...field}
						aria-required={true}
						aria-invalid={fieldState.invalid}
						errorMessage={fieldState.error?.message}
					/>
				)}
			/>
		</SmallForm>
	);
};

export default ConfirmPasswordReset;
