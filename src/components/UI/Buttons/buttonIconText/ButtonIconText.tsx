import type { BaseButton } from '@/types/baseProps';

import cl from './ButtonIconText.module.scss';
import classNames from 'classnames';
import ButtonBase from '../buttonBase/ButtonBase';
import Icon from '../../icon/Icon';

type ButtonIconTextProps = BaseButton & {
	size?: 'default' | 'small';
	icon: string;
	className?: string;
};

const ButtonIconText = ({
	size = 'default',
	icon,
	className,
	children,
	...props
}: ButtonIconTextProps) => {
	return (
		<ButtonBase
			className={{
				wrapper: classNames(cl.wrapper, cl[`wrapper_${size}`], className),
				button: classNames(cl.button),
				skeleton: cl.skeleton,
			}}
			{...props}
		>
			<Icon className={cl.icon}>{icon}</Icon>

			{children}
		</ButtonBase>
	);
};

export default ButtonIconText;
