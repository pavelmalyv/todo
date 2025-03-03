import App from './App.tsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './consts/yupLocales.ts';

import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';

import '@fontsource/oswald/400.css';
import '@fontsource/oswald/600.css';
import '@fontsource/oswald/700.css';

import '@styles/base/index.scss';
import 'material-symbols';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<GoogleOAuthProvider clientId="907643870031-5e8fd0slg9t64ci5ktjfhqbf5e3ngpjf.apps.googleusercontent.com">
				<App />
				<ToastContainer />
			</GoogleOAuthProvider>
		</Provider>
	</StrictMode>,
);
