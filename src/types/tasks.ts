import { addTaskSchema, tasksSchema } from '@/schemas/tasks';
import { InferType } from 'yup';

export type AddTask = InferType<typeof addTaskSchema>;
export type Tasks = InferType<typeof tasksSchema>;
