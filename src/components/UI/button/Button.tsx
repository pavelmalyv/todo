import classNames from 'classnames';
import cl from './Button.module.scss';
import useDelayedLoader from '@/hooks/useDelayedLoader';

interface ButtonProps {
	type?: 'button' | 'submit' | 'reset';
	disabled?: boolean;
	size?: 'small' | 'medium';
	style?: 'background' | 'border' | 'delete';
	isFull?: boolean;
	isLoading?: boolean;
	children: React.ReactNode;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({
	type = 'button',
	disabled,
	size = 'medium',
	style = 'background',
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
			className={classNames(cl.button, cl[`button_${size}`], cl[`button_${style}`], {
				[cl['button_full']]: isFull,
			})}
			onClick={onClick}
		>
			<span className={cl.body}>
				<span>{children}</span>
				{isLoadingDelayed && (
					<span className={cl['spinner-wrapper']}>
						<span className={cl.spinner}></span>
					</span>
				)}
			</span>
		</button>
	);
};

export default Button;
