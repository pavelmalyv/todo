import type { Auth } from 'firebase/auth';

import { showError } from '@/utils/notification';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from 'react';
import { ERRORS_MESSAGES } from '@/consts/messages';

const useAuthWitchNotifications = (auth: Auth) => {
	const [user, isLoading, error] = useAuthState(auth);

	useEffect(() => {
		if (!error) {
			return;
		}

		showError(ERRORS_MESSAGES.userLoading, error);
	}, [error]);

	return [user, isLoading] as const;
};

export default useAuthWitchNotifications;
