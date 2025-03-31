import { array, object } from 'yup';
import { hexColorSchema, nameTagSchema, tagIdSchema } from './fields';

export const saveTagSchema = object({
	name: nameTagSchema,
	color: hexColorSchema,
});

export const tagSchema = saveTagSchema.concat(
	object({
		id: tagIdSchema,
	}),
);

export const tagsSchema = array().of(tagSchema).required();
