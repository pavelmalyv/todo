import Authorization from '@/components/authorization/Authorization';
import Book from '@/components/book/Book';
import { useId } from 'react';

const LoginPage = () => {
	const titleId = useId();

	return (
		<Book aria-labelledby={titleId}>
			<Authorization titleId={titleId} />
		</Book>
	);
};

export default LoginPage;
