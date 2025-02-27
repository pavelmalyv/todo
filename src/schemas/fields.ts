import { MESSAGES_FIELD } from '@/consts/messages';
import { string } from 'yup';

export const emailSchema = string().email().required(MESSAGES_FIELD.emailRequired);
export const passwordSchema = string().required(MESSAGES_FIELD.passwordRequired);
export const passwordCreateSchema = string()
	.min(8, MESSAGES_FIELD.passwordMin(6))
	.max(4096, MESSAGES_FIELD.passwordMax(4096))
	.matches(/[A-Z]/, MESSAGES_FIELD.passwordUpperCase)
	.matches(/[a-z]/, MESSAGES_FIELD.passwordLowerCase)
	.matches(/[0-9]/, MESSAGES_FIELD.passwordNumber)
	.required(MESSAGES_FIELD.passwordRequired);
