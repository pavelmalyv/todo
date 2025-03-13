import cl from './Checkbox.module.scss';
import classNames from 'classnames';
import FieldError from '@/components/UI/fieldError/FieldError';
import Icon from '@/components/UI/icon/Icon';

import { forwardRef, useId } from 'react';

interface CheckboxProps {
	label: React.ReactNode;
	name?: string;
	style?: 'default' | 'through';
	checked?: boolean;
	disabled?: boolean;
	errorMessage?: string;
	center?: boolean;
	className?: string;
	labelId?: string;
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
			errorMessage,
			center = false,
			className,
			labelId,
			onChange,
			onBlur,
			'aria-controls': ariaControls,
			'aria-invalid': ariaInvalid,
			'aria-required': ariaRequired,
		},
		ref,
	) => {
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
				<label className={cl.label}>
					<input
						ref={ref}
						type="checkbox"
						className={cl.field}
						name={name}
						checked={checked}
						disabled={disabled}
						onChange={onChange}
						onBlur={onBlur}
						aria-controls={ariaControls}
						aria-invalid={ariaInvalid}
						aria-required={ariaRequired}
					/>
					<span className={cl.emulator}>
						<Icon className={cl['emulator-marker']}>check</Icon>
					</span>
					<span id={labelId} className={cl.description}>
						{label}
					</span>
				</label>
				<FieldError id={errorMessageId} message={errorMessage ? errorMessage : null} />
			</div>
		);
	},
);

export default Checkbox;
