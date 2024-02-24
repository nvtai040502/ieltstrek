import * as z from 'zod';

export type ModeType = 'edit' | 'exam' | 'practice';

export const ParamsAssessmentPageSchema = z.object({
  mode: z
    .literal('edit')
    .or(z.literal('exam'))
    .or(z.literal('practice'))
    .optional()
});

export const ParamsScorePageSchema = z.object({
  part: z.string().optional()
});
