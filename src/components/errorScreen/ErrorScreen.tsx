import cl from './ErrorScreen.module.scss';
import Button from '../UI/Buttons/button/Button';

import { useId } from 'react';
import { useTitle } from '@/hooks/ui/useTitle';

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
			onClickHomeButton?: React.MouseEventHandler<HTMLAnchorElement>;
	  }
);

const ErrorScreen = ({ title, description, isHomeButton, onClickHomeButton }: ErrorProps) => {
	useTitle(title);

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
						<Button to="/" styleType="border" onClick={onClickHomeButton}>
							На главную
						</Button>
					)}
				</div>
			</div>
		</section>
	);
};

export default ErrorScreen;
