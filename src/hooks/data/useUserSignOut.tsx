import { auth } from '@/firebase';
import { useSignOut } from 'react-firebase-hooks/auth';

const useUserSignOut = () => {
	const [signOut, isLoading, error] = useSignOut(auth);

	if (error) {
		console.error(error);
	}

	return [signOut, isLoading, error] as const;
};

export default useUserSignOut;
