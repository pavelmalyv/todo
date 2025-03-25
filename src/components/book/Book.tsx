import classNames from 'classnames';
import cl from './Book.module.scss';

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
}

const Main = ({ title, titleId, children }: MainProps) => {
	return (
		<div className={cl.main}>
			<h1 id={titleId} className={classNames('h1', cl.title)}>
				{title}
			</h1>

			{children}
		</div>
	);
};

Book.Main = Main;

export default Book;
