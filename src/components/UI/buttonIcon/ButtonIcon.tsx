import Icon from '../icon/Icon';
import cl from './ButtonIcon.module.scss';

interface ButtonIconProps {
	children: React.ReactNode;
	hiddenName: string;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	['aria-pressed']?: boolean | 'mixed';
	['aria-controls']?: string;
}
const ButtonIcon = ({
	children,
	hiddenName,
	onClick,
	['aria-pressed']: ariaPressed,
	['aria-controls']: ariaControls,
}: ButtonIconProps) => {
	return (
		<button
			type="button"
			className={cl.button}
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
