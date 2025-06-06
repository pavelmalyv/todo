import { string, ref, date, boolean } from 'yup';
import { isValidRangeTimestamp } from '@/utils/date';
import { MESSAGES_FIELD } from '@/consts/messages';
import {
	PASSWORD_MAX_LENGTH,
	PASSWORD_MIN_LENGTH,
	TAG_TITLE_MAX_LENGTH,
	TASK_TITLE_MAX_LENGTH,
} from '@/consts/config';

export const emailSchema = string().email().required(MESSAGES_FIELD.emailRequired);
export const passwordSchema = string().required(MESSAGES_FIELD.passwordRequired);
export const passwordCreateSchema = string()
	.min(PASSWORD_MIN_LENGTH, MESSAGES_FIELD.passwordMin(PASSWORD_MIN_LENGTH))
	.max(PASSWORD_MAX_LENGTH, MESSAGES_FIELD.passwordMax(PASSWORD_MAX_LENGTH))
	.matches(/[A-Z]/, MESSAGES_FIELD.passwordUpperCase)
	.matches(/[a-z]/, MESSAGES_FIELD.passwordLowerCase)
	.matches(/[0-9]/, MESSAGES_FIELD.passwordNumber)
	.required(MESSAGES_FIELD.passwordRequired);

export const getPasswordRepeatSchema = (fieldRef: string) => {
	return string()
		.oneOf([ref(fieldRef)], MESSAGES_FIELD.passwordRepeatIncorrect)
		.required(MESSAGES_FIELD.passwordRequired);
};
export const datePickerSchema = date()
	.required(MESSAGES_FIELD.dateRequired)
	.nullable(MESSAGES_FIELD.dateRequired)
	.test('not-empty', MESSAGES_FIELD.dateRequired, (value) => value !== null)
	.test('is-valid-range', MESSAGES_FIELD.dateRange(), (value) => {
		return value ? isValidRangeTimestamp(value.getTime()) : false;
	});

export const taskIdSchema = string().required();

export const nameTaskSchema = string()
	.max(TASK_TITLE_MAX_LENGTH, MESSAGES_FIELD.nameTaskMax(TASK_TITLE_MAX_LENGTH))
	.required(MESSAGES_FIELD.nameTaskRequired);

export const doneTaskSchema = boolean().required();

export const nameTagSchema = string()
	.max(TAG_TITLE_MAX_LENGTH, MESSAGES_FIELD.nameTagMax(TAG_TITLE_MAX_LENGTH))
	.required(MESSAGES_FIELD.nameTagRequired);

export const hexColorSchema = string()
	.matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, MESSAGES_FIELD.hexColorInvalid)
	.required(MESSAGES_FIELD.colorRequired);

export const tagIdSchema = string().required();
export const tagIdSchemaOptional = string();

export const policySchema = boolean()
	.oneOf([true], MESSAGES_FIELD.policyCheckbox)
	.required(MESSAGES_FIELD.policyRequired);
