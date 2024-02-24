import { PassageType, QuestionType } from '@prisma/client';
import * as z from 'zod';

export const AssessmentSchema = z.object({
  name: z.string().min(1, {
    message: 'Assessment Name is required'
  })
  // totalQuestions: z.coerce.number().min(10),
});

export const PartSchema = z.object({
  title: z.string().min(1, {
    message: 'Title Passage is required'
  }),
  description: z.string().min(1, {
    message: 'Title Passage is required'
  })
});

export const PassageSchema = z.object({
  title: z.string().min(1, {
    message: 'Title Passage is required'
  }),
  content: z.string().optional(),
  image: z.string().optional(),
  description: z.string().optional(),
  type: z.enum([PassageType.PASSAGE_SIMPLE, PassageType.PASSAGE_MULTI_HEADING])
});
export const PassageMultiHeadingSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1)
});

export const SummaryCompletionSchema = z.object({
  title: z.string().optional(),
  paragraphWithBlanks: z.string().min(1, {
    message: 'ParagraphWithBlanks is required'
  }),
  expectedAnswers: z.array(
    z.string().min(1, {
      message: 'Expected answer is required'
    })
  )
});
