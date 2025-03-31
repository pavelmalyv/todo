import Auth from '@/components/auth/Auth';
import Book from '@/components/book/Book';
import FieldText from '@/components/UI/Fields/fieldText/FieldText';

import { useId } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InferType, object } from 'yup';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase';
import { emailSchema, passwordSchema } from '@/schemas/fields';
import { getErrorMessageFirebase } from '@/utils/firebase';
import { useTitle } from '@/hooks/ui/useTitle';
import { REGISTRATION_URL, RESET_PASSWORD_URL } from '@/consts/routes';

const formSchema = object({
	email: emailSchema,
	password: passwordSchema,
});

type FormData = InferType<typeof formSchema>;

const LoginPage = () => {
	useTitle('Вход');

	const titleId = useId();
	const [signInWithEmailAndPassword, , isLoading, error] = useSignInWithEmailAndPassword(auth);

	let errorMessage: string | undefined;
	if (error) {
		errorMessage = getErrorMessageFirebase(error);
	}

	const { handleSubmit, control } = useForm<FormData>({
		resolver: yupResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit: SubmitHandler<FormData> = async (data) => {
		await signInWithEmailAndPassword(data.email, data.password);
	};

	return (
		<Book aria-labelledby={titleId}>
			<Book.Main title="Вход" titleId={titleId}>
				<Auth
					titleId={titleId}
					isLoading={isLoading}
					errorMessage={errorMessage}
					buttonName="Войти"
					footerLinks={[
						{
							linkName: 'Восстановить пароль',
							linkUrl: RESET_PASSWORD_URL,
						},
						{
							description: 'Нет аккаунта?',
							linkName: 'Зарегистрироваться',
							linkUrl: REGISTRATION_URL,
						},
					]}
					onSubmit={handleSubmit(onSubmit)}
				>
					<Controller
						name="email"
						control={control}
						render={({ field, fieldState }) => (
							<FieldText
								type="email"
								label="Email"
								placeholder="Email"
								autoComplete="email"
								aria-required={true}
								aria-invalid={fieldState.invalid}
								errorMessage={fieldState.error?.message}
								{...field}
							/>
						)}
					/>

					<Controller
						name="password"
						control={control}
						render={({ field, fieldState }) => (
							<FieldText
								label="Пароль"
								placeholder="Пароль"
								autoComplete="current-password"
								isPassword={true}
								aria-required={true}
								aria-invalid={fieldState.invalid}
								errorMessage={fieldState.error?.message}
								{...field}
							/>
						)}
					/>
				</Auth>
			</Book.Main>
		</Book>
	);
};

export default LoginPage;
