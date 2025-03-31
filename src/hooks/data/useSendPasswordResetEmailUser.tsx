import { auth } from '@/firebase';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';

const useSendPasswordResetEmailUser = () => {
	const [sendPasswordResetEmail, isLoading, error] = useSendPasswordResetEmail(auth);

	if (error) {
		console.error(error);
	}

	return [sendPasswordResetEmail, isLoading, error] as const;
};

export default useSendPasswordResetEmailUser;
