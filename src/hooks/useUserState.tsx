import { showError } from '@/utils/notification';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from 'react';
import { useAppSelector } from '@/store/hooks';
import { selectProfileComplete } from '@/store/authSlice';
import { auth } from '@/firebase';
import { ERRORS_MESSAGES } from '@/consts/messages';

interface UseUserStateOptions {
	isHandleError?: boolean;
}

const useUserState = (options?: UseUserStateOptions) => {
	const isHandleError = options?.isHandleError;
	const [userAuth, isLoadingAuth, error] = useAuthState(auth);
	const isProfileComplete = useAppSelector(selectProfileComplete);

	const isLoading = isLoadingAuth && isProfileComplete;
	const user = userAuth && isProfileComplete ? userAuth : null;

	useEffect(() => {
		if (!error || !isHandleError) {
			return;
		}

		showError(ERRORS_MESSAGES.userLoading, error);
	}, [error, isHandleError]);

	return [user, isLoading, error] as const;
};

export default useUserState;
