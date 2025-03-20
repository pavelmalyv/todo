import { tagIdSchema } from '@/schemas/fields';
import { InferType } from 'yup';

export type TagId = InferType<typeof tagIdSchema>;
