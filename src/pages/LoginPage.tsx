import Auth from '@/components/auth/Auth';
import Book from '@/components/book/Book';
import Field from '@/components/UI/field/Field';

import { useId } from 'react';

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
					linkUrl: '#',
				}}
			>
				<Field label="Email" placeholder="Email" />
				<Field label="Пароль" placeholder="Пароль" isProtected={true} />
			</Auth>
		</Book>
	);
};

export default LoginPage;
