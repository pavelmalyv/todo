import { array, date, number, object, string } from 'yup';
import { doneTaskSchema, nameTaskSchema } from './fields';

export const taskSchema = object({
	id: string().required(),
	name: string().required(),
	done: doneTaskSchema,
	dueAt: object({
		seconds: number().required(),
	}),
});

export const saveTaskSchema = object({
	name: nameTaskSchema,
	done: doneTaskSchema,
	dueAt: date().required(),
});

export const tasksSchema = array().of(taskSchema).required();
