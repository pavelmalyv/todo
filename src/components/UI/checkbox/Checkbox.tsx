import cl from './Checkbox.module.scss';
import classNames from 'classnames';
import FieldError from '@/components/UI/fieldError/FieldError';
import Icon from '@/components/UI/icon/Icon';

import { forwardRef, useId } from 'react';
import useDelayedLoader from '@/hooks/useDelayedLoader';

interface CheckboxProps {
	label: React.ReactNode;
	name?: string;
	style?: 'default' | 'through';
	checked?: boolean;
	disabled?: boolean;
	isLoading?: boolean;
	errorMessage?: string;
	center?: boolean;
	className?: string;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
	onBlur?: React.FocusEventHandler<HTMLInputElement>;
	'aria-controls'?: string;
	'aria-invalid'?: boolean;
	'aria-required'?: boolean;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
	(
		{
			label,
			name,
			style = 'default',
			checked,
			disabled,
			isLoading = false,
			errorMessage,
			center = false,
			className,
			onChange,
			onBlur,
			'aria-controls': ariaControls,
			'aria-invalid': ariaInvalid,
			'aria-required': ariaRequired,
		},
		ref,
	) => {
		const isLoadingDelayed = useDelayedLoader(isLoading);
		const fieldId = useId();
		const errorMessageId = useId();

		return (
			<div
				className={classNames(
					cl.checkbox,
					cl[`checkbox_${style}`],
					{ [cl['checkbox_center']]: center },
					className,
				)}
			>
				<input
					id={fieldId}
					ref={ref}
					type="checkbox"
					className={cl.field}
					name={name}
					checked={checked}
					disabled={disabled || isLoading}
					onChange={onChange}
					onBlur={onBlur}
					aria-controls={ariaControls}
					aria-invalid={ariaInvalid}
					aria-required={ariaRequired}
				/>
				<label htmlFor={fieldId} className={cl.label}>
					<span className={classNames(cl.emulator, { [cl['emulator_loading']]: isLoadingDelayed })}>
						<Icon className={cl['emulator-marker']}>check</Icon>
					</span>
					<span className={cl.description}>{label}</span>
				</label>
				<FieldError id={errorMessageId} message={errorMessage ? errorMessage : null} />
			</div>
		);
	},
);

export default Checkbox;
