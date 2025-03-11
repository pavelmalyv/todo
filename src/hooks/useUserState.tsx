import { useAuthState } from 'react-firebase-hooks/auth';
import { useAppSelector } from '@/store/hooks';
import { selectProfileComplete } from '@/store/authSlice';
import { auth } from '@/firebase';

const useUserState = () => {
	const [userAuth, isLoadingAuth, error] = useAuthState(auth);
	const isProfileComplete = useAppSelector(selectProfileComplete);

	const isLoading = isLoadingAuth && isProfileComplete;
	const user = userAuth && isProfileComplete ? userAuth : null;

	return [user, isLoading, error] as const;
};

export default useUserState;
