import Book from '@/components/book/Book';
import SmallForm from '@/components/Forms/smallForm/SmallForm';
import FieldText from '@/components/UI/Fields/fieldText/FieldText';
import useSendPasswordResetEmailUser from '@/hooks/data/useSendPasswordResetEmailUser';

import { emailSchema } from '@/schemas/fields';
import { getErrorMessageFirebase } from '@/utils/firebase';
import { showSuccess } from '@/utils/notification';
import { yupResolver } from '@hookform/resolvers/yup';
import { useId } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { InferType, object } from 'yup';
import { useTitle } from '@/hooks/ui/useTitle';
import { SUCCESS_MESSAGES } from '@/consts/messages';
import { LOGIN_URL } from '@/consts/routes';

const resetPasswordFormSchema = object({
	email: emailSchema,
});

type ResetPasswordFormData = InferType<typeof resetPasswordFormSchema>;

const ResetPasswordPage = () => {
	useTitle('Сброс пароля');

	const titleId = useId();
	const [sendPasswordResetEmail, isLoading, error] = useSendPasswordResetEmailUser();
	const errorMessage = error ? getErrorMessageFirebase(error) : undefined;

	const { control, handleSubmit, reset } = useForm<ResetPasswordFormData>({
		resolver: yupResolver(resetPasswordFormSchema),
		defaultValues: {
			email: '',
		},
	});

	const onSubmit: SubmitHandler<ResetPasswordFormData> = async (data) => {
		const isSuccess = await sendPasswordResetEmail(data.email);
		if (!isSuccess) {
			return;
		}

		reset();
		showSuccess(SUCCESS_MESSAGES.resetPassword);
	};

	return (
		<Book aria-labelledby={titleId}>
			<Book.Main
				title="Сброс пароля"
				titleId={titleId}
				backButton={{ to: LOGIN_URL, isCenter: true }}
			>
				<SmallForm
					onSubmit={handleSubmit(onSubmit)}
					buttonName="Восстановить"
					isLoading={isLoading}
					errorMessage={errorMessage}
				>
					<Controller
						name="email"
						control={control}
						render={({ field, fieldState }) => (
							<FieldText
								label="Ваш email"
								placeholder="Ваш email"
								{...field}
								aria-required={true}
								aria-invalid={fieldState.invalid}
								errorMessage={fieldState.error?.message}
							/>
						)}
					/>
				</SmallForm>
			</Book.Main>
		</Book>
	);
};

export default ResetPasswordPage;
