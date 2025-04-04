import AppRouter from './app/AppRouter';
import ErrorBoundaryApp from './app/ErrorBoundaryApp';
import { BrowserRouter } from 'react-router';
import { ToastContainer } from 'react-toastify';

const App = () => {
	return (
		<BrowserRouter>
			<ErrorBoundaryApp>
				<AppRouter />
				<ToastContainer />
			</ErrorBoundaryApp>
		</BrowserRouter>
	);
};

export default App;
