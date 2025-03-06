import type { Auth } from 'firebase/auth';

import { showError } from '@/utils/notification';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from 'react';
import { useAppSelector } from '@/store/hooks';
import { selectProfileComplete } from '@/store/authSlice';
import { ERRORS_MESSAGES } from '@/consts/messages';

const useUserState = (auth: Auth) => {
	const [userAuth, isLoadingAuth, error] = useAuthState(auth);
	const isProfileComplete = useAppSelector(selectProfileComplete);

	const isLoading = isLoadingAuth && isProfileComplete;
	const user = userAuth && isProfileComplete ? userAuth : null;

	useEffect(() => {
		if (!error) {
			return;
		}

		showError(ERRORS_MESSAGES.userLoading, error);
	}, [error]);

	return [user, isLoading] as const;
};

export default useUserState;
