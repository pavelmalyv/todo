import { Slide, toast } from 'react-toastify';

export const showError = (message: string) => {
	toast.error(message, {
		transition: Slide,
	});
};

export const showSuccess = (message: string) => {
	toast.success(message, {
		transition: Slide,
	});
};
