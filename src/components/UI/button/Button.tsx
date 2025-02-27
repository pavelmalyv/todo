import classNames from 'classnames';
import cl from './Button.module.scss';
import useDelayedLoader from '@/hooks/useDelayedLoader';

interface ButtonProps {
	type?: 'button' | 'submit' | 'reset';
	disabled?: boolean;
	isFull?: boolean;
	isLoading?: boolean;
	children: React.ReactNode;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({
	type = 'button',
	disabled,
	isFull,
	isLoading = false,
	children,
	onClick,
}: ButtonProps) => {
	const isLoadingDelayed = useDelayedLoader(isLoading);

	return (
		<button
			type={type}
			disabled={disabled || isLoading}
			className={classNames(cl.button, { [cl['button_full']]: isFull })}
			onClick={onClick}
		>
			<span className={cl.body}>
				<span>{children}</span>
				{isLoadingDelayed && <span className={cl.spinner}></span>}
			</span>
		</button>
	);
};

export default Button;
