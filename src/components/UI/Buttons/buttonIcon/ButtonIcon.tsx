import type { BaseButton } from '@/types/baseProps';

import cl from './ButtonIcon.module.scss';
import classNames from 'classnames';
import Icon from '../../icon/Icon';
import ButtonBase from '../buttonBase/ButtonBase';

type ButtonIconProps = BaseButton & {
	hiddenName: string;
	styleType?: 'default' | 'circle';
	size?: 'default' | 'large';
	className?: string;
};

const ButtonIcon = ({
	hiddenName,
	styleType = 'default',
	size = 'default',
	className,
	children,
	...props
}: ButtonIconProps) => {
	return (
		<ButtonBase
			{...props}
			className={{
				wrapper: classNames(cl.wrapper, cl[`wrapper_${size}`], className),
				button: classNames(cl.button, cl[`button_${styleType}`]),
				skeleton: cl.skeleton,
			}}
		>
			<span className="visually-hidden">{hiddenName}</span>

			<Icon>{children}</Icon>
		</ButtonBase>
	);
};

export default ButtonIcon;
