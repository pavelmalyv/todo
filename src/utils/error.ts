export class NotFoundError extends Error {
	constructor(message = 'Not Found') {
		super(message);
		this.name = 'NotFoundError';
	}
}

export const checkNotFoundErrorOrThrow = (error: unknown) => {
	if (error instanceof NotFoundError) {
		throw NotFoundError;
	}
};

export const isNotFoundError = (error: unknown) => {
	return error instanceof NotFoundError;
};

export const requiredParamOrThrow = (param: string | undefined) => {
	if (!param) {
		throw new NotFoundError();
	}

	return param;
};

export const normalizeError = (error: unknown) => {
	if (error instanceof Error) {
		return error;
	}

	return new Error(typeof error === 'string' ? error : 'An unknown error occurred');
};
