export const normalizeError = (error: unknown) => {
	if (error instanceof Error) {
		return error;
	}

	return new Error(typeof error === 'string' ? error : 'An unknown error occurred');
};
