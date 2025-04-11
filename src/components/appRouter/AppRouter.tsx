import Root from '@/pages/Root';
import useUserState from '@/hooks/useUserState';
import LoadingScreen from '../loadingScreen/LoadingScreen';
import useShowError from '@/hooks/useShowError';

import { Navigate, Route, Routes } from 'react-router';
import { lazy, Suspense } from 'react';
import {
	CALENDAR,
	getTagUrl,
	getTasksDayUrl,
	LOGIN_URL,
	REGISTRATION_URL,
	RESET_PASSWORD_URL,
	TODAY_TASKS_URL,
	TOMORROW_TASKS_URL,
} from '@/consts/routes';
import { ERRORS_MESSAGES } from '@/consts/messages';

const HomePage = lazy(() => import('@/pages/HomePage'));
const LoginPage = lazy(() => import('@/pages/LoginPage'));
const UpcomingPage = lazy(() => import('@/pages/UpcomingPage'));
const RegistrationPage = lazy(() => import('@/pages/RegistrationPage'));
const TodayPage = lazy(() => import('@/pages/TodayPage'));
const TomorrowPage = lazy(() => import('@/pages/TomorrowPage'));
const TagPage = lazy(() => import('@/pages/TagPage'));
const CalendarPage = lazy(() => import('@/pages/CalendarPage'));
const TasksDay = lazy(() => import('@/pages/TasksDay'));
const ResetPasswordPage = lazy(() => import('@/pages/ResetPasswordPage'));

const AppRouter = () => {
	const [user, isLoading, error] = useUserState();
	useShowError(ERRORS_MESSAGES.userLoading, error);

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
			<Route
				path={TODAY_TASKS_URL}
				element={
					<Suspense>
						<TodayPage />
					</Suspense>
				}
			/>
			<Route
				path={TOMORROW_TASKS_URL}
				element={
					<Suspense>
						<TomorrowPage />
					</Suspense>
				}
			/>
			<Route
				path={getTagUrl(':id')}
				element={
					<Suspense>
						<TagPage />
					</Suspense>
				}
			/>
			<Route
				path={CALENDAR}
				element={
					<Suspense>
						<CalendarPage />
					</Suspense>
				}
			/>
			<Route
				path={getTasksDayUrl(':timestampDay')}
				element={
					<Suspense>
						<TasksDay />
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
			<Route
				path={RESET_PASSWORD_URL}
				element={
					<Suspense>
						<ResetPasswordPage />
					</Suspense>
				}
			/>
			<Route path="*" element={<Navigate to={LOGIN_URL} />} />
		</>
	);

	if (isLoading) {
		return <LoadingScreen />;
	}

	return (
		<Routes>
			<Route element={<Root />}>{user ? privateRoutes : publicRoutes}</Route>
		</Routes>
	);
};

export default AppRouter;
