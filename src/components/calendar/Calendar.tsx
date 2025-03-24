import type { DaysFocus } from '@/types/calendar';

import cl from './Calendar.module.scss';
import DayCalendar from '../dayCalendar/DayCalendar';
import DatePicker, { registerLocale } from 'react-datepicker';

import { ru } from 'date-fns/locale';
import { v4 as uuid } from 'uuid';
import { useState } from 'react';
import { produce } from 'immer';

registerLocale('ru', ru);

const CLASS_NAME_DAY_CELL = 'calendar-day-cell_' + uuid();
const CLASS_NAME_DAY = 'calendar-day' + uuid();

const Calendar = () => {
	const [daysFocus, setDaysFocus] = useState<DaysFocus>({});

	const updateDaysTabindex = (e: React.FocusEvent<HTMLDivElement>, isFocus: boolean) => {
		const target = e.target;

		const cellElement = target.closest<HTMLDivElement>(`.${CLASS_NAME_DAY_CELL}`);
		if (!cellElement) {
			return;
		}

		const dayElement = cellElement.querySelector<HTMLDivElement>(`.${CLASS_NAME_DAY}`);
		if (!dayElement) {
			return;
		}

		const id = dayElement.dataset.id;
		if (!id) {
			return;
		}

		setDaysFocus(
			produce((draft) => {
				if (draft[id] === undefined) {
					return;
				}

				draft[id] = isFocus;
			}),
		);
	};

	const renderDayContents = (day: number, date: Date) => {
		const id = date.getTime();

		return (
			<DayCalendar
				day={day}
				timestamp={id}
				isFocus={daysFocus[id]}
				classNameCell={CLASS_NAME_DAY_CELL}
				className={CLASS_NAME_DAY}
				setDaysFocus={setDaysFocus}
			/>
		);
	};

	return (
		<div
			className={cl.calendar}
			onFocus={(e) => updateDaysTabindex(e, true)}
			onBlur={(e) => updateDaysTabindex(e, false)}
		>
			<DatePicker
				disabled={true}
				selected={null}
				inline
				dateFormat="dd.MM.yyyy"
				locale="ru"
				previousMonthAriaLabel="Предыдущий месяц"
				previousMonthButtonLabel="Предыдущий месяц"
				nextMonthAriaLabel="Следующий месяц"
				nextMonthButtonLabel="Следующий месяц"
				previousYearAriaLabel="Предыдущий год"
				previousYearButtonLabel="Предыдущий год"
				nextYearAriaLabel="Следующий год"
				nextYearButtonLabel="Следующий год"
				renderDayContents={renderDayContents}
				dayClassName={() => CLASS_NAME_DAY_CELL}
				className={cl['calendar-body']}
			/>
		</div>
	);
};

export default Calendar;
