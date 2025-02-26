import classNames from 'classnames';
import cl from './FieldError.module.scss';

interface FieldErrorProps {
	id: string;
	message: string | null;
}

const FieldError = ({ id, message }: FieldErrorProps) => {
	return (
		<div
			id={id}
			className={classNames(cl.message, { [cl['message_visible']]: message })}
			aria-live="polite"
		>
			{message}
		</div>
	);
};

export default FieldError;
