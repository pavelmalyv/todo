import classNames from 'classnames';
import cl from './Field.module.scss';
import FieldError from '../fieldError/FieldError';

import { forwardRef, useId, useState } from 'react';
import ButtonIcon from '../buttonIcon/ButtonIcon';

interface FieldProps {
	label: string;
	type?: string;
	name?: string;
	placeholder?: string;
	value?: string;
	disabled?: boolean;
	maxLength?: number;
	errorMessage?: string;
	autoComplete?: string;
	isProtected?: boolean;
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
			errorMessage,
			autoComplete,
			isProtected,
			onChange,
			onBlur,
			'aria-controls': ariaControls,
			'aria-invalid': ariaInvalid,
			'aria-required': ariaRequired,
		},
		ref,
	) => {
		const [isProtectedState, setIsProtectedState] = useState(true);
		const fieldId = useId();
		const errorMessageId = useId();

		let typeField = type;
		if (isProtected) {
			typeField = isProtectedState ? 'password' : 'text';
		}

		return (
			<div className={cl.wrapper}>
				<label htmlFor={fieldId} className="visually-hidden">
					{label}
				</label>
				<div className={cl.body}>
					<input
						ref={ref}
						id={fieldId}
						className={classNames(cl.field, { [cl['field_icon']]: isProtected })}
						type={typeField}
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
						aria-describedby={errorMessageId}
						aria-required={ariaRequired}
					/>
					{isProtected && (
						<ButtonIcon
							hiddenName={'Показать пароль'}
							onClick={() => setIsProtectedState((prev) => !prev)}
							aria-pressed={!isProtectedState}
							aria-controls={fieldId}
							className={cl.button}
						>
							{isProtectedState ? 'visibility' : 'visibility_off'}
						</ButtonIcon>
					)}
				</div>
				<FieldError id={errorMessageId} message={errorMessage ? errorMessage : null} />
			</div>
		);
	},
);

export default Field;
