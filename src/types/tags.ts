import { tagSaveSchema } from '@/schemas/tags';
import { InferType } from 'yup';

export type TagSave = InferType<typeof tagSaveSchema>;
