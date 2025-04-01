import { auth } from '@/firebase';
import { normalizeError } from '@/utils/error';
import { useSignOut } from 'react-firebase-hooks/auth';

const useUserSignOut = () => {
	const [signOut, isLoading, error] = useSignOut(auth);

	if (error) {
		console.error(error);
	}

	const normalizedError = error ? normalizeError(error) : undefined;
	return [signOut, isLoading, normalizedError] as const;
};

export default useUserSignOut;
