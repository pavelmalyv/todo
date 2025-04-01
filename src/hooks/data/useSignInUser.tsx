import { auth } from '@/firebase';
import { normalizeError } from '@/utils/error';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';

const useSignInUser = () => {
	const [signInWithEmailAndPassword, , isLoading, error] = useSignInWithEmailAndPassword(auth);

	if (error) {
		console.error(error);
	}

	const normalizedError = error ? normalizeError(error) : undefined;
	return [signInWithEmailAndPassword, isLoading, normalizedError] as const;
};

export default useSignInUser;
