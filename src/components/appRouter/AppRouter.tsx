import Root from '@/pages/Root';
import useUserState from '@/hooks/useUserState';
import LoadingScreen from '../loadingScreen/LoadingScreen';
import useDelayedLoader from '@/hooks/useDelayedLoader';

import { Navigate, Route, Routes } from 'react-router';
import { lazy, Suspense, useEffect } from 'react';
import { showError } from '@/utils/notification';
import { LOGIN_URL, REGISTRATION_URL } from '@/consts/routes';
import { ERRORS_MESSAGES } from '@/consts/messages';

const HomePage = lazy(() => import('@/pages/HomePage'));
const LoginPage = lazy(() => import('@/pages/LoginPage'));
const UpcomingPage = lazy(() => import('@/pages/UpcomingPage'));
const RegistrationPage = lazy(() => import('@/pages/RegistrationPage'));

const AppRouter = () => {
	const [user, isLoading, error] = useUserState();
	const isDelayedLoading = useDelayedLoader(isLoading);

	useEffect(() => {
		if (!error) {
			return;
		}

		showError(ERRORS_MESSAGES.userLoading, error);
	}, [error]);

	const privateRoutes = (
		<>
			<Route
				index
				element={
					<Suspense>
						<UpcomingPage />
					</Suspense>
				}
			/>

			<Route path="*" element={<Navigate to={'/'} />} />
		</>
	);

	const publicRoutes = (
		<>
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
			<Route
				path={REGISTRATION_URL}
				element={
					<Suspense>
						<RegistrationPage />
					</Suspense>
				}
			/>
			<Route path="*" element={<Navigate to={LOGIN_URL} />} />
		</>
	);

	if (isDelayedLoading) {
		return <LoadingScreen />;
	}

	return (
		<Routes>
			<Route element={<Root />}>{user ? privateRoutes : publicRoutes}</Route>
		</Routes>
	);
};

export default AppRouter;
