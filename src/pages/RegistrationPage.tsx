import Auth from '@/components/auth/Auth';
import Book from '@/components/book/Book';
import FieldText from '@/components/UI/Fields/fieldText/FieldText';
import Checkbox from '@/components/UI/checkbox/Checkbox';
import useCreateUser from '@/hooks/data/useCreateUser';

import { useId } from 'react';
import { InferType, object } from 'yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { getErrorMessageFirebase } from '@/utils/firebase';
import {
	emailSchema,
	getPasswordRepeatSchema,
	passwordCreateSchema,
	policySchema,
} from '@/schemas/fields';
import { Link } from 'react-router';
import { useTitle } from '@/hooks/ui/useTitle';
import { LOGIN_URL, POLICY_URL } from '@/consts/routes';

const formSchema = object({
	email: emailSchema,
	password: passwordCreateSchema,
	passwordRepeat: getPasswordRepeatSchema('password'),
	policy: policySchema,
});

type FormData = InferType<typeof formSchema>;

const RegistrationPage = () => {
	useTitle('Регистрация');

	const titleId = useId();
	const [createUser, isLoading, error] = useCreateUser();

	const { handleSubmit, control } = useForm<FormData>({
		resolver: yupResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
			passwordRepeat: '',
			policy: false,
		},
	});

	const onSubmit: SubmitHandler<FormData> = async (data) => {
		await createUser({ email: data.email, password: data.password });
	};

	let errorMessage: string | undefined;
	if (error) {
		errorMessage = getErrorMessageFirebase(error);
	}

	return (
		<Book aria-labelledby={titleId}>
			<Book.Main title="Регистрация" titleId={titleId}>
				<Auth
					titleId={titleId}
					buttonName="Зарегистрироваться"
					isLoading={isLoading}
					errorMessage={errorMessage}
					footerLinks={[
						{
							description: 'Уже зарегистрированы?',
							linkName: 'Войти',
							linkUrl: LOGIN_URL,
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
					<Controller
						name="policy"
						control={control}
						render={({ field, fieldState }) => (
							<Checkbox
								label={
									<>
										Я принимаю
										<br />
										<Link to={POLICY_URL} target="_blank" className="link">
											политику конфиденциальности
										</Link>
									</>
								}
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
