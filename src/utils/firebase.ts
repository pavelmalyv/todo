import { ERRORS_MESSAGES_FIREBASE } from '@/consts/messages';

const isErrorFirebase = (error: unknown): error is { code: string; message: string } => {
	return (
		typeof error === 'object' &&
		error !== null &&
		'code' in error &&
		'message' in error &&
		typeof error.code === 'string' &&
		typeof error.message === 'string'
	);
};

export const getErrorMessageFirebase = (error: unknown) => {
	if (isErrorFirebase(error)) {
		const message = ERRORS_MESSAGES_FIREBASE[error.code];
		if (message) {
			return message;
		}
	}

	console.error(error);
	return ERRORS_MESSAGES_FIREBASE.unknown;
};
