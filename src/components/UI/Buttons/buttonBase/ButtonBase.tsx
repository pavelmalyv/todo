import type { BaseButton } from '@/types/baseProps';

import cl from './ButtonBase.module.scss';
import classNames from 'classnames';
import VisuallyHiddenLoader from '@/components/visuallyHiddenLoader/VisuallyHiddenLoader';
import Skeleton from 'react-loading-skeleton';
import useDelayedLoader from '@/hooks/ui/useDelayedLoader';
import { Link } from 'react-router';

type ButtonBaseProps = BaseButton & {
	isSpinnerSmall?: boolean;
	className?: {
		wrapper?: string;
		button?: string;
		skeleton?: string;
	};
};

const ButtonBase = ({
	type,
	to,
	isSkeleton,
	isLoading = false,
	isLoadingSkeleton = false,
	isSpinnerSmall = true,
	disabled,
	className,
	children,
	...props
}: ButtonBaseProps) => {
	const isLoadingDelayed = useDelayedLoader(isLoading);

	const body = isSpinnerSmall ? (
		children
	) : (
		<span className={cl.body}>
			{isLoadingDelayed && <span className={cl.spinner}></span>}
			{children}
		</span>
	);
	const classNameButton = classNames(cl.button, className?.button);
	const isDisabled = disabled || isLoading;

	return (
		<div
			className={classNames(cl['wrapper'], className?.wrapper, {
				[cl['wrapper_disabled']]: isDisabled,
				[cl['wrapper_spinner-small']]: isSpinnerSmall,
			})}
		>
			<VisuallyHiddenLoader isLoading={isLoadingSkeleton}>
				{isSkeleton ? (
					<Skeleton className={classNames(cl.skeleton, className?.skeleton)} />
				) : (
					<>
						{to !== undefined ? (
							<Link to={to} className={classNameButton} {...(props as React.ComponentProps<'a'>)}>
								{body}
							</Link>
						) : (
							<button
								type={type ?? 'button'}
								className={classNameButton}
								disabled={isDisabled}
								{...(props as React.ComponentProps<'button'>)}
							>
								{body}
							</button>
						)}
					</>
				)}
			</VisuallyHiddenLoader>

			{isLoadingDelayed && isSpinnerSmall && (
				<span className={cl['spinner-wrapper']}>
					<span className={cl.spinner}></span>
				</span>
			)}
		</div>
	);
};

export default ButtonBase;
