import Book from '@/components/book/Book';
import { useId } from 'react';

const LoginPage = () => {
	const titleId = useId();

	return <Book aria-labelledby={titleId}>Login</Book>;
};

export default LoginPage;
