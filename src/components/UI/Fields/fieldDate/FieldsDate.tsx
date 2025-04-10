import type { BaseFieldProps } from '@/types/baseProps';

import 'react-datepicker/dist/react-datepicker.css';
import cl from './FieldDate.module.scss';

import Icon from '../../icon/Icon';
import ErrorField from '../../errorField/ErrorField';
import FieldText from '../fieldText/FieldText';
import mergeRefs from 'merge-refs';
import DatePicker, { registerLocale } from 'react-datepicker';

import { forwardRef, useId, useRef } from 'react';
import { ru } from 'date-fns/locale';

registerLocale('ru', ru);

const CustomInput = forwardRef<
	HTMLInputElement,
	BaseFieldProps & {
		label: string;
		mergeRef: React.Ref<HTMLInputElement>;
	}
>(({ label, mergeRef, ...props }, ref) => {
	return <FieldText ref={mergeRefs(ref, mergeRef)} label={label} className={cl.field} {...props} />;
});

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
		const errorMessageId = useId();

		const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
			if (isOpenRef.current) {
				event.stopPropagation();
			}
		};

		const handleCalendarClose = () => {
			isOpenRef.current = false;
		};

		return (
			<div>
				<div className={cl['field-wrapper']} onKeyDown={handleKeyDown}>
					<DatePicker
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
						chooseDayAriaLabelPrefix="Выбрать"
						monthAriaLabelPrefix="Месяц"
						weekAriaLabelPrefix="Неделя"
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
						customInput={<CustomInput mergeRef={ref} label={label} />}
						onCalendarClose={handleCalendarClose}
						onCalendarOpen={() => (isOpenRef.current = true)}
						popperModifiers={[
							{
								name: 'flip',
								fn: () => ({
									reset: true,
								}),
							},
						]}
					/>

					<Icon className={cl.icon}>calendar_month</Icon>
				</div>

				<ErrorField id={errorMessageId} message={errorMessage ? errorMessage : null} />
			</div>
		);
	},
);

export default FieldDate;
