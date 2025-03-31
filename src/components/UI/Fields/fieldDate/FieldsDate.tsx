import 'react-datepicker/dist/react-datepicker.css';
import cl from './FieldDate.module.scss';

import Icon from '../../icon/Icon';
import FieldError from '../../fieldError/FieldError';
import DatePicker, { registerLocale } from 'react-datepicker';

import { forwardRef, useId, useRef } from 'react';
import { ru } from 'date-fns/locale';

registerLocale('ru', ru);

const CustomInput = forwardRef<HTMLInputElement, React.HTMLProps<HTMLInputElement>>(
	(props, ref) => {
		return <input ref={ref} {...props} />;
	},
);

interface FieldDateProps {
	label: string;
	placeholder?: string;
	value?: Date | null;
	name?: string;
	disabled?: boolean;
	errorMessage?: string;
	onChange?: (date: Date | null) => void;
	onBlur?: React.FocusEventHandler<HTMLElement>;
	'aria-invalid'?: boolean;
	'aria-required'?: boolean;
}

const FieldDate = forwardRef<HTMLInputElement, FieldDateProps>(
	(
		{
			label,
			placeholder,
			value,
			name,
			disabled,
			errorMessage,
			onChange,
			onBlur,
			'aria-invalid': ariaInvalid,
			'aria-required': ariaRequired,
		},
		ref,
	) => {
		const isOpenRef = useRef<boolean | null>(null);
		const titleId = useId();
		const errorMessageId = useId();

		const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
			if (event.key == 'Escape' && isOpenRef.current) {
				event.stopPropagation();
			}
		};

		return (
			<div>
				<label htmlFor={titleId} className="visually-hidden">
					{label}
				</label>

				<div className={cl['field-wrapper']}>
					<DatePicker
						id={titleId}
						selected={value}
						name={name}
						disabled={disabled}
						placeholderText={placeholder}
						className={cl.field}
						onChange={onChange}
						onBlur={onBlur}
						showTimeSelect
						timeCaption="Время"
						timeFormat="HH:mm"
						dateFormat="dd.MM.yyyy HH:mm"
						locale="ru"
						previousMonthAriaLabel="Предыдущий месяц"
						previousMonthButtonLabel="Предыдущий месяц"
						nextMonthAriaLabel="Следующий месяц"
						nextMonthButtonLabel="Следующий месяц"
						previousYearAriaLabel="Предыдущий год"
						previousYearButtonLabel="Предыдущий год"
						nextYearAriaLabel="Следующий год"
						nextYearButtonLabel="Следующий год"
						timeIntervals={1}
						wrapperClassName={cl['date-wrapper']}
						popperClassName={cl.popper}
						ariaInvalid={String(ariaInvalid)}
						ariaRequired={String(ariaRequired)}
						ariaDescribedBy={errorMessageId}
						customInput={<CustomInput ref={ref} />}
						onCalendarClose={() => (isOpenRef.current = false)}
						onCalendarOpen={() => (isOpenRef.current = true)}
						popperModifiers={[
							{
								name: 'flip',
								fn: () => ({
									reset: true,
								}),
							},
						]}
						onKeyDown={handleKeyDown}
					/>

					<Icon className={cl.icon}>calendar_month</Icon>
				</div>

				<FieldError id={errorMessageId} message={errorMessage ? errorMessage : null} />
			</div>
		);
	},
);

export default FieldDate;
