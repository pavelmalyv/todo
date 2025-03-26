import Button from '../UI/button/Button';
import cl from './ErrorScreen.module.scss';
import { useId } from 'react';

type ErrorProps = {
	title: string;
	description: string;
} & (
	| {
			isHomeButton?: false;
			onClickHomeButton?: never;
	  }
	| {
			isHomeButton?: true;
			onClickHomeButton?: React.MouseEventHandler<HTMLLinkElement>;
	  }
);

const ErrorScreen = ({ title, description, isHomeButton, onClickHomeButton }: ErrorProps) => {
	const titleId = useId();

	return (
		<section className={cl.section} aria-labelledby={titleId}>
			<div className="container">
				<div className={cl.body}>
					<h1 id={titleId} className="h1">
						{title}
					</h1>
					<div className={cl.description}>{description}</div>

					{isHomeButton && (
						<Button to="/" type="link" style="border" onClick={onClickHomeButton}>
							На главную
						</Button>
					)}
				</div>
			</div>
		</section>
	);
};

export default ErrorScreen;
