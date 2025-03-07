import classNames from 'classnames';
import cl from './ErrorMessage.module.scss';
import { useEffect } from 'react';

interface ErrorMessageProps {
	message: string | undefined;
	error?: unknown;
	className?: string;
}

const ErrorMessage = ({ message, error, className }: ErrorMessageProps) => {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className={classNames(cl.error, className)} role="status">
			{message}
		</div>
	);
};

export default ErrorMessage;
