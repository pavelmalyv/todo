import type { TagId } from './fields';
import type { QueryDocumentSnapshot } from 'firebase/firestore';
import type { InferType } from 'yup';

import { taskIdSchema } from '@/schemas/fields';
import { saveTaskSchema, tasksSchema, taskSchema } from '@/schemas/tasks';

export type TaskId = InferType<typeof taskIdSchema>;
export type SaveTask = InferType<typeof saveTaskSchema>;
export type Task = InferType<typeof taskSchema>;
export type Tasks = InferType<typeof tasksSchema>;

export interface CreateQueryFilter {
	tagId?: TagId;
	timestampStart?: number;
	timestampEnd?: number;
	limit?: number;
	startDoc?: QueryDocumentSnapshot;
}
