import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase';
import { normalizeError } from '@/utils/error';

const useUserState = () => {
	const [user, isLoading, error] = useAuthState(auth);

	if (error) {
		console.error(error);
	}

	const normalizedError = error ? normalizeError(error) : undefined;
	return [user ?? null, isLoading, normalizedError] as const;
};

export default useUserState;
