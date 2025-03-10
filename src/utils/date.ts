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
