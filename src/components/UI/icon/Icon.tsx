import classNames from 'classnames';
import cl from './Icon.module.scss';

interface IconProps {
	className?: string;
	children: React.ReactNode;
}

const Icon = ({ children, className }: IconProps) => {
	return (
		<span
			className={classNames('material-symbols-outlined', cl.icon, className)}
			aria-hidden="true"
		>
			{children}
		</span>
	);
};

export default Icon;
