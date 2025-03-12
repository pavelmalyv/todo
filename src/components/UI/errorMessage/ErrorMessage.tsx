import classNames from 'classnames';
import cl from './ErrorMessage.module.scss';

interface ErrorMessageProps {
	message: string | undefined;
	error?: Error;
	className?: string;
}

const ErrorMessage = ({ message, error, className }: ErrorMessageProps) => {
	if (error) {
		console.error(error);
	}

	return (
		<div className={classNames(cl.error, className)} role="status">
			{message}
		</div>
	);
};

export default ErrorMessage;
