import Auth from '@/components/auth/Auth';
import Book from '@/components/book/Book';
import Field from '@/components/UI/field/Field';
import useCreateUserEmailPasswordFullField from '@/hooks/useCreateUserEmailPasswordFullField';
import Checkbox from '@/components/UI/checkbox/Checkbox';

import { useId } from 'react';
import { InferType, object } from 'yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { auth } from '@/firebase';
import { getErrorMessageFirebase } from '@/utils/firebase';
import { Link } from 'react-router';
import {
	emailSchema,
	getPasswordRepeatSchema,
	nameSchema,
	passwordCreateSchema,
	policySchema,
} from '@/schemas/fields';

import { LOGIN_URL } from '@/consts/routes';

const formSchema = object({
	name: nameSchema,
	email: emailSchema,
	password: passwordCreateSchema,
	passwordRepeat: getPasswordRepeatSchema('password'),
	policy: policySchema,
});

type FormData = InferType<typeof formSchema>;

const RegistrationPage = () => {
	const titleId = useId();
	const [createUser, isLoading, error] = useCreateUserEmailPasswordFullField(auth);

	const { handleSubmit, control } = useForm<FormData>({
		resolver: yupResolver(formSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			passwordRepeat: '',
			policy: false,
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
			<Auth
				type="signup"
				title="Регистрация"
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

				<Controller
					name="policy"
					control={control}
					render={({ field, fieldState }) => {
						const labelPolicy = (
							<>
								Я принимаю{' '}
								<Link className="link" to="#">
									политику конфиденциальности
								</Link>
							</>
						);

						return (
							<Checkbox
								label={labelPolicy}
								{...field}
								aria-required={true}
								aria-invalid={fieldState.invalid}
								errorMessage={fieldState.error?.message}
							/>
						);
					}}
				/>
			</Auth>
		</Book>
	);
};

export default RegistrationPage;
