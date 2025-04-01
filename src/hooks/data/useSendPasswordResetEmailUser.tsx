import { auth } from '@/firebase';
import { normalizeError } from '@/utils/error';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';

const useSendPasswordResetEmailUser = () => {
	const [sendPasswordResetEmail, isLoading, error] = useSendPasswordResetEmail(auth);

	if (error) {
		console.error(error);
	}

	const normalizedError = error ? normalizeError(error) : undefined;
	return [sendPasswordResetEmail, isLoading, normalizedError] as const;
};

export default useSendPasswordResetEmailUser;
