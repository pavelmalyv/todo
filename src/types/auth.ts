import { googleIdTokenSchema } from '@/schemas/auth';
import { InferType } from 'yup';

export type GoogleIdTokenSchema = InferType<typeof googleIdTokenSchema>;
