import { TIMESTAMP_MAX, TIMESTAMP_MIN } from '@/consts/validation';

export const getDateRanges = () => {
	const todayStart = new Date();
	todayStart.setHours(0);
	todayStart.setMinutes(0);
	todayStart.setSeconds(0);
	todayStart.setMilliseconds(0);

	const todayEnd = new Date(todayStart);
	todayEnd.setDate(todayEnd.getDate() + 1);

	const tomorrowEnd = new Date(todayEnd);
	tomorrowEnd.setDate(tomorrowEnd.getDate() + 1);

	const nearStart = new Date(tomorrowEnd);
	const nearEnd = new Date(tomorrowEnd);
	nearEnd.setDate(nearEnd.getDate() + 5);

	return {
		today: {
			start: todayStart.getTime(),
			end: todayEnd.getTime(),
		},
		tomorrow: {
			start: todayEnd.getTime(),
			end: tomorrowEnd.getTime(),
		},
		near: {
			start: nearStart.getTime(),
			end: nearEnd.getTime(),
		},
	};
};

export const isValidRangeTimestamp = (timestamp: number) => {
	return timestamp >= TIMESTAMP_MIN && timestamp <= TIMESTAMP_MAX;
};

export const getDisplayTaskDate = (timestamp: number) => {
	return new Date(timestamp * 1000)
		.toLocaleString('ru-RU', {
			year: 'numeric',
			month: 'numeric',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		})
		.replace(',', '');
};
