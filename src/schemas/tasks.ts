import { array, date, number, object } from 'yup';
import { doneTaskSchema, nameTaskSchema, taskIdSchema, tagIdSchemaOptional } from './fields';

export const saveTaskSchema = object({
	name: nameTaskSchema,
	done: doneTaskSchema,
	dueAt: date().required(),
	tagId: tagIdSchemaOptional,
});

export const taskSchema = saveTaskSchema.omit(['dueAt']).concat(
	object({
		id: taskIdSchema,
		dueAt: object({
			seconds: number().required(),
		}),
	}),
);

export const tasksSchema = array().of(taskSchema).required();
