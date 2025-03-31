import { auth } from '@/firebase';

export const getCurrentUser = () => {
	const user = auth.currentUser;
	if (!user) {
		throw new Error('The user is not logged in');
	}

	return user;
};
