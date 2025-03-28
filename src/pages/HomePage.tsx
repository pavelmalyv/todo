import Book from '@/components/book/Book';
import StartBook from '@/components/startBook/StartBook';

import { useTitle } from '@/hooks/useTitle';
import { useId } from 'react';

const HomePage = () => {
	useTitle();

	const titleId = useId();

	return (
		<Book aria-labelledby={titleId}>
			<StartBook titleId={titleId} />
		</Book>
	);
};

export default HomePage;
