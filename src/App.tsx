import AppRouter from './components/appRouter/AppRouter';
import { BrowserRouter } from 'react-router';

const App = () => {
	return (
		<BrowserRouter>
			<AppRouter />
		</BrowserRouter>
	);
};

export default App;
