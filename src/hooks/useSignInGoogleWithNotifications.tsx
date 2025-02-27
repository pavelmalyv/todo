import type { Auth } from 'firebase/auth';

import { showError } from '@/utils/notification';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useEffect } from 'react';
import { isErrorFirebase } from '@/utils/firebase';
import { ERRORS_MESSAGES } from '@/consts/messages';

const userCancelledCodes = ['auth/popup-closed-by-user', 'auth/user-cancelled'];

const useSignInGoogleWithNotifications = (auth: Auth) => {
	const [signInWithGoogle, user, isLoading, error] = useSignInWithGoogle(auth);

	useEffect(() => {
		if (!error) {
			return;
		}

		if (isErrorFirebase(error) && userCancelledCodes.includes(error.code)) {
			return;
		}

		showError(ERRORS_MESSAGES.googleAuth, error);
	}, [error]);

	return [signInWithGoogle, user, isLoading] as const;
};

export default useSignInGoogleWithNotifications;
