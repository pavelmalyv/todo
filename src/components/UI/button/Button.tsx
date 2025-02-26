import classNames from 'classnames';
import cl from './Button.module.scss';

interface ButtonProps {
	type?: 'button' | 'submit' | 'reset';
	disabled?: boolean;
	isFull?: boolean;
	children: React.ReactNode;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ type = 'button', disabled, isFull, children, onClick }: ButtonProps) => {
	return (
		<button
			type={type}
			disabled={disabled}
			className={classNames(cl.button, { [cl['button_full']]: isFull })}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default Button;
