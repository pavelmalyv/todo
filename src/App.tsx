import AppRouter from './app/AppRouter';
import ErrorBoundaryApp from './app/ErrorBoundaryApp';
import ToastPortal from './components/toastPortal/ToastPortal';
import { BrowserRouter } from 'react-router';

const App = () => {
	return (
		<BrowserRouter>
			<ErrorBoundaryApp>
				<AppRouter />
				<ToastPortal />
			</ErrorBoundaryApp>
		</BrowserRouter>
	);
};

export default App;
