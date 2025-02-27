import { MESSAGES_FIELD } from '@/consts/messages';
import { string, ref } from 'yup';

export const emailSchema = string().email().required(MESSAGES_FIELD.emailRequired);
export const passwordSchema = string().required(MESSAGES_FIELD.passwordRequired);
export const passwordCreateSchema = string()
	.min(8, MESSAGES_FIELD.passwordMin(8))
	.max(4096, MESSAGES_FIELD.passwordMax(4096))
	.matches(/[A-Z]/, MESSAGES_FIELD.passwordUpperCase)
	.matches(/[a-z]/, MESSAGES_FIELD.passwordLowerCase)
	.matches(/[0-9]/, MESSAGES_FIELD.passwordNumber)
	.required(MESSAGES_FIELD.passwordRequired);
export const nameSchema = string()
	.required(MESSAGES_FIELD.nameRequired)
	.max(4096, MESSAGES_FIELD.nameMax(4096));

export const getPasswordRepeatSchema = (fieldRef: string) => {
	return string()
		.oneOf([ref(fieldRef)], MESSAGES_FIELD.passwordRepeatIncorrect)
		.required(MESSAGES_FIELD.passwordRequired);
};
