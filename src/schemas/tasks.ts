import { array, boolean, date, object, string } from 'yup';

export const taskSchema = object({
	id: string().required(),
	name: string().required(),
	done: boolean().required(),
});

export const addTaskSchema = object({
	name: string().required(),
	done: boolean().required(),
	dueAt: date().required(),
});

export const tasksSchemas = array().of(taskSchema).required();
