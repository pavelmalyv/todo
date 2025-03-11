import { Slide, toast } from 'react-toastify';

export const showError = (message: string, error?: unknown) => {
	toast.error(message, {
		transition: Slide,
	});

	if (error) {
		console.error(error);
	}
};

export const showSuccess = (message: string) => {
	toast.success(message, {
		transition: Slide,
	});
};
