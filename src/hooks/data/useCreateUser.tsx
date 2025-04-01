import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase';
import { normalizeError } from '@/utils/error';

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
			throw normalizeError(error);
		}
	};

	const normalizedError = error ? normalizeError(error) : undefined;
	return [createUser, isLoading, normalizedError] as const;
};

export default useCreateUser;
