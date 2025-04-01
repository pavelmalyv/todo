import type { BaseButton } from '@/types/baseProps';

import cl from './Button.module.scss';
import classNames from 'classnames';
import ButtonBase from '../buttonBase/ButtonBase';

type ButtonProps = BaseButton & {
	size?: 'default' | 'small' | 'medium';
	styleType?: 'default' | 'border' | 'delete';
	isFull?: boolean;
	className?: string;
};

const Button = ({
	size = 'default',
	styleType = 'default',
	children,
	isFull,
	className,
	...props
}: ButtonProps) => {
	return (
		<ButtonBase
			isSpinnerSmall={size === 'small'}
			className={{
				wrapper: classNames(cl.wrapper, cl[`wrapper_${size}`], className, {
					[cl['wrapper_full']]: isFull,
				}),
				button: classNames(cl.button, cl[`button_${size}`], cl[`button_${styleType}`]),
				skeleton: classNames(cl.skeleton),
			}}
			{...props}
		>
			{children}
		</ButtonBase>
	);
};

export default Button;
