import cl from './Field.module.scss';
import { forwardRef, useId } from 'react';

interface FieldProps {
	label: string;
	type?: string;
	name?: string;
	placeholder?: string;
	value?: string;
	disabled?: boolean;
	maxLength?: number;
	autoComplete?: string;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
	onBlur?: React.FocusEventHandler<HTMLInputElement>;
	'aria-controls'?: string;
	'aria-invalid'?: boolean;
	'aria-required'?: boolean;
}

const Field = forwardRef<HTMLInputElement, FieldProps>(
	(
		{
			label,
			type = 'text',
			name,
			placeholder,
			value,
			disabled,
			maxLength,
			autoComplete,
			onChange,
			onBlur,
			'aria-controls': ariaControls,
			'aria-invalid': ariaInvalid,
			'aria-required': ariaRequired,
		},
		ref,
	) => {
		const fieldId = useId();

		return (
			<div className={cl.wrapper}>
				<label htmlFor={fieldId} className="visually-hidden">
					{label}
				</label>
				<input
					ref={ref}
					id={fieldId}
					className={cl.field}
					type={type}
					name={name}
					placeholder={placeholder}
					value={value}
					disabled={disabled}
					maxLength={maxLength}
					onChange={onChange}
					onBlur={onBlur}
					autoComplete={autoComplete}
					aria-controls={ariaControls}
					aria-invalid={ariaInvalid}
					aria-required={ariaRequired}
				/>
			</div>
		);
	},
);

export default Field;
