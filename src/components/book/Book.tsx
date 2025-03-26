import classNames from 'classnames';
import cl from './Book.module.scss';
import VisuallyHiddenLoader from '../visuallyHiddenLoader/VisuallyHiddenLoader';

import { Link } from 'react-router';
import { LOGIN_URL } from '@/consts/routes';

interface BookProps {
	children: React.ReactNode;
	'aria-labelledby': string;
}

const Book = ({ children, ['aria-labelledby']: ariaLabelledby }: BookProps) => {
	return (
		<section className={classNames(cl.book, 'section')} aria-labelledby={ariaLabelledby}>
			<div className="container">
				<div className={cl.wrapper}>
					<div className={cl.inner}>
						<div className={cl.image}>
							<picture>
								<img
									className={cl['image-img']}
									src="/img/book.jpg"
									width={1160}
									height={1444}
									alt="Пустой лист со списком задач висит на стене"
								/>
							</picture>
						</div>
						<div className={cl.body}>{children}</div>
					</div>
				</div>
			</div>
		</section>
	);
};

interface MainProps {
	title: string;
	titleId?: string;
	children: React.ReactNode;
	isCancelButton?: boolean;
	isCancelButtonCenter?: boolean;
	isLoading?: boolean;
}

const Main = ({
	title,
	titleId,
	children,
	isCancelButton,
	isCancelButtonCenter = true,
	isLoading = false,
}: MainProps) => {
	return (
		<VisuallyHiddenLoader isLoading={isLoading}>
			<div className={cl.main}>
				{isLoading ? (
					<div className={cl['spinner-wrapper']}>
						<div className={cl.spinner}></div>
					</div>
				) : (
					<>
						<h1 id={titleId} className={classNames('h1', cl.title)}>
							{title}
						</h1>

						{children}

						{isCancelButton && (
							<div
								className={classNames(cl['link-wrapper'], {
									[cl['link-wrapper_center']]: isCancelButtonCenter,
								})}
							>
								<Link to={LOGIN_URL} className={'link'}>
									Отмена
								</Link>
							</div>
						)}
					</>
				)}
			</div>
		</VisuallyHiddenLoader>
	);
};

Book.Main = Main;

export default Book;
