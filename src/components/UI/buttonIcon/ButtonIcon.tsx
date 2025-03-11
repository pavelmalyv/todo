import classNames from 'classnames';
import cl from './ButtonIcon.module.scss';
import Icon from '../icon/Icon';

interface ButtonIconProps {
	style?: 'light' | 'circle';
	children: React.ReactNode;
	hiddenName: string;
	size?: 'medium' | 'large';
	className?: string;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	['aria-pressed']?: boolean | 'mixed';
	['aria-controls']?: string;
}
const ButtonIcon = ({
	style = 'light',
	children,
	hiddenName,
	size = 'medium',
	className,
	onClick,
	['aria-pressed']: ariaPressed,
	['aria-controls']: ariaControls,
}: ButtonIconProps) => {
	return (
		<button
			type="button"
			className={classNames(cl.button, cl[`button_${style}`], cl[`button_${size}`], className)}
			onClick={onClick}
			aria-pressed={ariaPressed}
			aria-controls={ariaControls}
		>
			<span className="visually-hidden">{hiddenName}</span>
			<Icon>{children}</Icon>
		</button>
	);
};

export default ButtonIcon;
