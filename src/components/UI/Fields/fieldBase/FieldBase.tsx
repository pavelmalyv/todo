import type { BaseFieldProps } from '@/types/baseProps';

import cl from './FieldBase.module.scss';
import classNames from 'classnames';
import VisuallyHiddenLoader from '@/components/visuallyHiddenLoader/VisuallyHiddenLoader';
import Skeleton from 'react-loading-skeleton';
import ErrorField from '../../errorField/ErrorField';

import { forwardRef, useId } from 'react';

type FieldBaseProps = BaseFieldProps & {
	isVisuallyHiddenLabel?: boolean;
	className?: {
		body?: string;
		field?: string;
		skeleton?: string;
	};
};

const FieldBase = forwardRef<HTMLInputElement, FieldBaseProps>(
	(
		{
			label,
			isSkeleton,
			isLoading = false,
			errorMessage,
			className,
			isVisuallyHiddenLabel = true,
			children,
			id,
			...props
		},
		ref,
	) => {
		const fieldIdGenerated = useId();
		const errorMessageId = useId();
		const fieldId = id ?? fieldIdGenerated;

		return (
			<div className={cl.wrapper}>
				<VisuallyHiddenLoader isLoading={isLoading}>
					{isSkeleton ? (
						<Skeleton className={classNames(className?.skeleton, cl.skeleton)} />
					) : (
						<>
							<div className={cl['label-wrapper']}>
								<label
									htmlFor={fieldId}
									className={classNames(cl.label, {
										['visually-hidden']: isVisuallyHiddenLabel,
									})}
								>
									{label}
								</label>
								<div className={classNames(cl.body, className?.body)}>
									<input
										ref={ref}
										id={fieldId}
										className={classNames(className?.field, cl.field)}
										{...props}
									/>

									{children}
								</div>
							</div>
							<ErrorField id={errorMessageId} message={errorMessage ? errorMessage : null} />
						</>
					)}
				</VisuallyHiddenLoader>
			</div>
		);
	},
);

export default FieldBase;
