import { array, object, string } from 'yup';
import { hexColorSchema, nameTagSchema } from './fields';

export const tagSchema = object({
	id: string().required(),
	color: hexColorSchema,
	name: string().required(),
});

export const saveTagSchema = object({
	name: nameTagSchema,
	color: hexColorSchema,
});

export const tagsSchema = array().of(tagSchema).required();
