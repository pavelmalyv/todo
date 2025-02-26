import classNames from 'classnames';
import cl from './Icon.module.scss';

interface IconProps {
	children: React.ReactNode;
}

const Icon = ({ children }: IconProps) => {
	return (
		<span className={classNames('material-symbols-outlined', cl.icon)} aria-hidden="true">
			{children}
		</span>
	);
};

export default Icon;
