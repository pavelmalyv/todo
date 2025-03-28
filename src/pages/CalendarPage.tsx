import Calendar from '@/components/calendar/Calendar';
import Profile from '@/components/profile/Profile';
import { useTitle } from '@/hooks/useTitle';

const CalendarPage = () => {
	useTitle('Календарь');

	return (
		<Profile title="Календарь">
			<Calendar />
		</Profile>
	);
};

export default CalendarPage;
