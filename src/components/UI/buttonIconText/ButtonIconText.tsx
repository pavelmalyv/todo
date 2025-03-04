import classNames from 'classnames';
import cl from './ButtonIconText.module.scss';
import Icon from '../icon/Icon';

interface ButtonIconTextProps {
	size?: 'small' | 'medium';
	icon: string;
	className?: string;
	children?: React.ReactNode;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const ButtonIconText = ({
	size = 'medium',
	icon,
	className,
	children,
	onClick,
}: ButtonIconTextProps) => {
	return (
		<button
			type="button"
			className={classNames(cl.button, cl[`button_${size}`], className)}
			onClick={onClick}
		>
			<Icon className={cl.icon}>{icon}</Icon>

			{children}
		</button>
	);
};

export default ButtonIconText;
