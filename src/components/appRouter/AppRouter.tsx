import Root from '@/pages/Root';

import { Route, Routes } from 'react-router';
import { lazy, Suspense } from 'react';
import { LOGIN_URL } from '@/consts/routes';

const HomePage = lazy(() => import('../../pages/HomePage'));
const LoginPage = lazy(() => import('../../pages/LoginPage'));

const AppRouter = () => {
	return (
		<Routes>
			<Route element={<Root />}>
				<Route
					index
					element={
						<Suspense>
							<HomePage />
						</Suspense>
					}
				/>
				<Route
					path={LOGIN_URL}
					element={
						<Suspense>
							<LoginPage />
						</Suspense>
					}
				/>
			</Route>
		</Routes>
	);
};

export default AppRouter;
