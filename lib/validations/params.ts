import * as z from 'zod';

export type ModeType = 'edit' | 'exam' | 'practice';

export const searchParamsSchema = z.object({
  mode: z
    .literal('edit')
    .or(z.literal('exam'))
    .or(z.literal('practice'))
    .optional()
});
