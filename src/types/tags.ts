import { tagSchema, tagsSchema } from './../schemas/tags';
import { tagSaveSchema } from '@/schemas/tags';
import { InferType } from 'yup';

export type Tag = InferType<typeof tagSchema>;
export type TagSave = InferType<typeof tagSaveSchema>;
export type Tags = InferType<typeof tagsSchema>;
