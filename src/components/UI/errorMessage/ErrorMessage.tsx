import cl from './ErrorMessage.module.scss';

interface ErrorMessageProps {
	message: string | undefined;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
	return (
		<div className={cl.error} role="status">
			{message}
		</div>
	);
};

export default ErrorMessage;
