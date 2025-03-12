import { showError } from '@/utils/notification';
import { useEffect } from 'react';

const useShowError = (message: string, error: Error | undefined) => {
	useEffect(() => {
		if (!error?.message || !error?.message) {
			return;
		}

		showError(message);
	}, [error?.name, error?.message, message]);

	if (error) {
		console.error(error);
	}
};

export default useShowError;
