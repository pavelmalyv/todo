import { tagSchema, tagsSchema } from './../schemas/tags';
import { saveTagSchema } from '@/schemas/tags';
import { InferType } from 'yup';

export type Tag = InferType<typeof tagSchema>;
export type SaveTag = InferType<typeof saveTagSchema>;
export type Tags = InferType<typeof tagsSchema>;
