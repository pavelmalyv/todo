import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase';

interface createUser {
	email: string;
	password: string;
}

const useCreateUser = () => {
	const [createUserWithEmailAndPassword, , isLoading, error] =
		useCreateUserWithEmailAndPassword(auth);

	const createUser = async ({ email, password }: createUser) => {
		try {
			await createUserWithEmailAndPassword(email, password);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	return [createUser, isLoading, error] as const;
};

export default useCreateUser;
