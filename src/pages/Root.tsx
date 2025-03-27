import CookieModal from '@/components/Modals/cookieModal/CookieModal';
import { Outlet } from 'react-router';

const Root = () => {
	return (
		<>
			<main>
				<Outlet />
			</main>

			<CookieModal />
		</>
	);
};

export default Root;
