import cl from './LoadingScreen.module.scss';
import { LOADING_MESSAGES } from '@/consts/messages';

const LoadingScreen = () => {
	return (
		<div className={cl.screen}>
			<span className="visually-hidden">{LOADING_MESSAGES.common}</span>
			<div className={cl.spinner}></div>
		</div>
	);
};

export default LoadingScreen;
