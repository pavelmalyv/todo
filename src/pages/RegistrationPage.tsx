import Auth from '@/components/auth/Auth';
import Book from '@/components/book/Book';
import Field from '@/components/UI/field/Field';
import useCreateUserEmailPasswordFullField from '@/hooks/useCreateUserEmailPasswordFullField';

import { useId } from 'react';
import { InferType, object } from 'yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { getErrorMessageFirebase } from '@/utils/firebase';
import {
	emailSchema,
	getPasswordRepeatSchema,
	nameSchema,
	passwordCreateSchema,
} from '@/schemas/fields';

import { LOGIN_URL } from '@/consts/routes';

const formSchema = object({
	name: nameSchema,
	email: emailSchema,
	password: passwordCreateSchema,
	passwordRepeat: getPasswordRepeatSchema('password'),
});

type FormData = InferType<typeof formSchema>;

const RegistrationPage = () => {
	const titleId = useId();
	const [createUser, isLoading, error] = useCreateUserEmailPasswordFullField();

	const { handleSubmit, control } = useForm<FormData>({
		resolver: yupResolver(formSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			passwordRepeat: '',
		},
	});

	const onSubmit: SubmitHandler<FormData> = async (data) => {
		await createUser({ email: data.email, password: data.password, name: data.name });
	};

	let errorMessage: string | undefined;
	if (error) {
		errorMessage = getErrorMessageFirebase(error);
	}

	return (
		<Book aria-labelledby={titleId}>
			<Book.Main title="Регистрация" titleId={titleId}>
				<Auth
					type="signup"
					titleId={titleId}
					buttonName="Зарегистрироваться"
					isLoading={isLoading}
					errorMessage={errorMessage}
					footer={{ description: 'Уже зарегистрированы?', linkName: 'Войти', linkUrl: LOGIN_URL }}
					onSubmit={handleSubmit(onSubmit)}
				>
					<Controller
						name="name"
						control={control}
						render={({ field, fieldState }) => (
							<Field
								label="Имя"
								placeholder="Имя*"
								autoComplete="name"
								{...field}
								aria-required={true}
								aria-invalid={fieldState.invalid}
								errorMessage={fieldState.error?.message}
							/>
						)}
					/>
					<Controller
						name="email"
						control={control}
						render={({ field, fieldState }) => (
							<Field
								type="email"
								label="E-mail"
								placeholder="E-mail*"
								autoComplete="email"
								{...field}
								aria-required={true}
								aria-invalid={fieldState.invalid}
								errorMessage={fieldState.error?.message}
							/>
						)}
					/>
					<Controller
						name="password"
						control={control}
						render={({ field, fieldState }) => (
							<Field
								label="Пароль"
								placeholder="Пароль*"
								isProtected={true}
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
							<Field
								label="Повтор пароля"
								placeholder="Повтор пароля*"
								isProtected={true}
								autoComplete="new-password"
								{...field}
								aria-required={true}
								aria-invalid={fieldState.invalid}
								errorMessage={fieldState.error?.message}
							/>
						)}
					/>
				</Auth>
			</Book.Main>
		</Book>
	);
};

export default RegistrationPage;
