import classNames from 'classnames';
import cl from './Button.module.scss';
import VisuallyHiddenLoader from '@/components/visuallyHiddenLoader/VisuallyHiddenLoader';
import Skeleton from 'react-loading-skeleton';
import useDelayedLoader from '@/hooks/useDelayedLoader';

import { Link } from 'react-router';

type ButtonProps = {
	size?: 'small' | 'medium';
	style?: 'background' | 'border' | 'delete';
	className?: string;
	isFull?: boolean;
	isLoading?: boolean;
	isLoadingSkeleton?: boolean;
	isSkeleton?: boolean;
	children: React.ReactNode;
} & (
	| {
			type?: 'button' | 'submit' | 'reset';
			disabled?: boolean;
			onClick?: React.MouseEventHandler<HTMLButtonElement>;
			target?: never;
			to?: never;
	  }
	| {
			type: 'link';
			to: string;
			target?: string;
			disabled?: never;
			onClick?: never;
	  }
);

const Button = ({
	type = 'button',
	to,
	target,
	disabled,
	size = 'medium',
	style = 'background',
	className,
	isFull,
	isLoading = false,
	isLoadingSkeleton = false,
	isSkeleton = false,
	children,
	onClick,
}: ButtonProps) => {
	const isLoadingDelayed = useDelayedLoader(isLoading);

	const body = (
		<span className={cl.body}>
			<span>{children}</span>
			{isLoadingDelayed && (
				<span className={cl['spinner-wrapper']}>
					<span className={cl.spinner}></span>
				</span>
			)}
		</span>
	);

	const classNameButton = classNames(
		cl.button,
		className,
		cl[`button_${size}`],
		cl[`button_${style}`],
		{
			[cl['button_full']]: isFull,
		},
	);

	if (type === 'link') {
		return (
			<Link to={to ?? '#'} target={target} className={classNameButton}>
				{body}
			</Link>
		);
	}
	return (
		<div className={classNames(cl['button-wrapper'], cl[`button-wrapper_${size}`])}>
			<VisuallyHiddenLoader isLoading={isLoadingSkeleton}>
				{isSkeleton ? (
					<Skeleton className={cl.skeleton} />
				) : (
					<button
						type={type}
						disabled={disabled || isLoading}
						className={classNameButton}
						onClick={onClick}
					>
						{body}
					</button>
				)}
			</VisuallyHiddenLoader>
		</div>
	);
};

export default Button;
