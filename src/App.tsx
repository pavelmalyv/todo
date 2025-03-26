import AppRouter from './app/AppRouter';
import ErrorBoundaryApp from './app/ErrorBoundaryApp';
import { BrowserRouter } from 'react-router';

const App = () => {
	return (
		<BrowserRouter>
			<ErrorBoundaryApp>
				<AppRouter />
			</ErrorBoundaryApp>
		</BrowserRouter>
	);
};

export default App;
