import App from './App.tsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import './consts/yupLocales.ts';

import '@fontsource/noto-sans/300.css';
import '@fontsource/noto-sans/400.css';
import '@fontsource/noto-sans/700.css';

import '@fontsource/oswald/400.css';
import '@fontsource/oswald/600.css';
import '@fontsource/oswald/700.css';

import '@styles/base/index.scss';
import 'material-symbols';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App />
		<ToastContainer />
	</StrictMode>,
);
