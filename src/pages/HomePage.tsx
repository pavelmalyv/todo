import Book from '@/components/book/Book';
import StartBook from '@/components/startBook/StartBook';
import { useId } from 'react';

const HomePage = () => {
	const titleId = useId();

	return (
		<Book aria-labelledby={titleId}>
			<StartBook titleId={titleId} />
		</Book>
	);
};

export default HomePage;
