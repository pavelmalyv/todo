import Auth from '@/components/auth/Auth';
import Book from '@/components/book/Book';
import Field from '@/components/UI/field/Field';

import { useId } from 'react';
import { REGISTRATION_URL } from '@/consts/routes';

const LoginPage = () => {
	const titleId = useId();

	return (
		<Book aria-labelledby={titleId}>
			<Auth
				title="Вход"
				titleId={titleId}
				buttonName="Войти"
				footer={{
					description: 'Нет аккаунта?',
					linkName: 'Зарегистрироваться',
					linkUrl: REGISTRATION_URL,
				}}
			>
				<Field type="email" label="Email" placeholder="Email" autoComplete="email" />
				<Field
					label="Пароль"
					placeholder="Пароль"
					isProtected={true}
					autoComplete="current-password"
				/>
			</Auth>
		</Book>
	);
};

export default LoginPage;
