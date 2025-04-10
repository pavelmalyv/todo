import { ToastContainer } from 'react-toastify';
import { createPortal } from 'react-dom';

const toastSelector = '#toast';
const toastElement = document.querySelector(toastSelector);
const matchShortcutToast = (e: KeyboardEvent) => e.ctrlKey && e.key === 't';

const ToastPortal = () => {
	if (!toastElement) {
		throw new Error(`Element with selector "${toastSelector}" not found`);
	}

	return (
		<>
			{createPortal(
				<ToastContainer hotKeys={matchShortcutToast} aria-label="Уведомления Control + T" />,
				toastElement,
			)}
		</>
	);
};

export default ToastPortal;
