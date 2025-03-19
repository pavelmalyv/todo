import { object } from 'yup';
import { hexColorSchema, nameTagSchema } from './fields';

export const tagSaveSchema = object({
	name: nameTagSchema,
	color: hexColorSchema,
});
