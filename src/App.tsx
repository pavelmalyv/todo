import AppRouter from './app/AppRouter';
import ErrorBoundaryApp from './app/ErrorBoundaryApp';
import { BrowserRouter } from 'react-router';
import { ToastContainer } from 'react-toastify';

const matchShortcutToast = (e: KeyboardEvent) => e.ctrlKey && e.key === 't';

const App = () => {
	return (
		<BrowserRouter>
			<ErrorBoundaryApp>
				<AppRouter />
				<ToastContainer hotKeys={matchShortcutToast} aria-label="Уведомления Control + T" />
			</ErrorBoundaryApp>
		</BrowserRouter>
	);
};

export default App;
