import classNames from 'classnames';
import cl from './ButtonIconText.module.scss';
import Icon from '../icon/Icon';

interface ButtonIconTextProps {
	size?: 'small' | 'medium';
	icon: string;
	children?: React.ReactNode;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const ButtonIconText = ({ size = 'medium', icon, children, onClick }: ButtonIconTextProps) => {
	return (
		<button type="button" className={classNames(cl.button, cl[`button_${size}`])} onClick={onClick}>
			<span className={cl.icon}>
				<Icon>{icon}</Icon>
			</span>

			{children}
		</button>
	);
};

export default ButtonIconText;
