import { showError } from '@/utils/notification';
import { useEffect } from 'react';

const useShowError = (message: string, error: Error | undefined) => {
	useEffect(() => {
		if (!error?.name || !error?.message) {
			return;
		}

		showError(message);
	}, [error?.name, error?.message, message]);
};

export default useShowError;
