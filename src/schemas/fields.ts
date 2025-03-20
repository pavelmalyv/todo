import { string, ref, date, boolean } from 'yup';
import { MESSAGES_FIELD } from '@/consts/messages';

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
export const datePickerSchema = date()
	.required(MESSAGES_FIELD.dateRequired)
	.nullable(MESSAGES_FIELD.dateRequired)
	.test('not-empty', MESSAGES_FIELD.dateRequired, (value) => value !== null);

export const nameTaskSchema = string()
	.max(350, MESSAGES_FIELD.nameTaskMax(350))
	.required(MESSAGES_FIELD.nameTaskRequired);

export const doneTaskSchema = boolean().required();

export const nameTagSchema = string()
	.max(100, MESSAGES_FIELD.nameTagMax(100))
	.required(MESSAGES_FIELD.nameTagRequired);

export const hexColorSchema = string()
	.matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, MESSAGES_FIELD.hexColorInvalid)
	.required(MESSAGES_FIELD.colorRequired);

export const tagIdSchema = string().required();
export const tagIdSchemaOptional = string();
