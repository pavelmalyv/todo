import { tagsSchema } from './../schemas/tags';
import { tagSaveSchema } from '@/schemas/tags';
import { InferType } from 'yup';

export type TagSave = InferType<typeof tagSaveSchema>;
export type Tags = InferType<typeof tagsSchema>;
