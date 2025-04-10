import Calendar from '@/components/Calendar/calendar/Calendar';
import Profile from '@/components/profile/Profile';
import { useTitle } from '@/hooks/ui/useTitle';

const CalendarPage = () => {
	useTitle('Календарь');

	return (
		<Profile title="Календарь">
			<Calendar />
		</Profile>
	);
};

export default CalendarPage;
