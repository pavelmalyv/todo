import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase';

const useUserState = () => {
	const [user, isLoading, error] = useAuthState(auth);

	return [user ?? null, isLoading, error] as const;
};

export default useUserState;
