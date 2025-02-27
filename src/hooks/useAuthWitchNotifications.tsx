import type { Auth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

const useAuthWitchNotifications = (auth: Auth) => {
	const [user, isLoading, error] = useAuthState(auth);

	if (error) {
		console.log(error);
	}

	return [user, isLoading] as const;
};

export default useAuthWitchNotifications;
