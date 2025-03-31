import classNames from 'classnames';
import cl from './ErrorMessage.module.scss';

interface ErrorMessageProps {
	message: string | undefined;
	className?: string;
}

const ErrorMessage = ({ message, className }: ErrorMessageProps) => {
	return (
		<div className={classNames(cl.error, className)} role="status">
			{message}
		</div>
	);
};

export default ErrorMessage;
