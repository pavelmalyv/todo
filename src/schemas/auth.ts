import { object, string } from 'yup';

export const googleIdTokenSchema = object({
	email: string().required(),
	sub: string().required(),
});
