import { array, boolean, object, string } from 'yup';

export const taskSchema = object({
	id: string().required(),
	name: string().required(),
	done: boolean().required(),
});

export const tasksSchemas = array().of(taskSchema).required();
