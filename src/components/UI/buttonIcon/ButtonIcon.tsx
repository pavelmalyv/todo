import classNames from 'classnames';
import cl from './ButtonIcon.module.scss';
import Icon from '../icon/Icon';

interface ButtonIconProps {
	children: React.ReactNode;
	hiddenName: string;
	size?: 'medium' | 'large';
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	['aria-pressed']?: boolean | 'mixed';
	['aria-controls']?: string;
}
const ButtonIcon = ({
	children,
	hiddenName,
	size = 'medium',
	onClick,
	['aria-pressed']: ariaPressed,
	['aria-controls']: ariaControls,
}: ButtonIconProps) => {
	return (
		<button
			type="button"
			className={classNames(cl.button, cl[`button_${size}`])}
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
