import Auth from '@/components/auth/Auth';
import Book from '@/components/book/Book';
import Field from '@/components/UI/field/Field';
import LoginSocials from '@/components/loginSocials/LoginSocials';

import { useId } from 'react';
import { InferType, object } from 'yup';
import {
	emailSchema,
	getPasswordRepeatSchema,
	nameSchema,
	passwordCreateSchema,
} from '@/schemas/fields';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { LOGIN_URL } from '@/consts/routes';
import { yupResolver } from '@hookform/resolvers/yup';

const formSchema = object({
	name: nameSchema,
	email: emailSchema,
	password: passwordCreateSchema,
	passwordRepeat: getPasswordRepeatSchema('password'),
});

type FormData = InferType<typeof formSchema>;

const RegistrationPage = () => {
	const titleId = useId();

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
		console.log(data);
	};

	return (
		<Book aria-labelledby={titleId}>
			<Auth
				title="Регистрация"
				titleId={titleId}
				footer={{ description: 'Уже зарегистрированы?', linkName: 'Войти', linkUrl: LOGIN_URL }}
			>
				<Auth.Form buttonName="Зарегистрироваться" onSubmit={handleSubmit(onSubmit)}>
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
				</Auth.Form>
				<Auth.LoginSocials>
					<LoginSocials>
						<LoginSocials.Google />
					</LoginSocials>
				</Auth.LoginSocials>
			</Auth>
		</Book>
	);
};

export default RegistrationPage;
