import Root from '@/pages/Root';
import { Route, Routes } from 'react-router';
import { lazy, Suspense } from 'react';

const HomePage = lazy(() => import('../../pages/HomePage'));

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
			</Route>
		</Routes>
	);
};

export default AppRouter;
