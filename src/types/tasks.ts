import { tasksSchemas } from '@/schemas/tasks';
import { InferType } from 'yup';

export type Tasks = InferType<typeof tasksSchemas>;
