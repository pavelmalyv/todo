import { array, date, number, object, string } from 'yup';
import { doneTaskSchema, nameTaskSchema, taskIdSchema, tagIdSchemaOptional } from './fields';

export const taskSchema = object({
	id: taskIdSchema,
	name: string().required(),
	done: doneTaskSchema,
	tagId: tagIdSchemaOptional,
	dueAt: object({
		seconds: number().required(),
	}),
});

export const saveTaskSchema = object({
	name: nameTaskSchema,
	done: doneTaskSchema,
	dueAt: date().required(),
	tagId: tagIdSchemaOptional,
});

export const tasksSchema = array().of(taskSchema).required();
