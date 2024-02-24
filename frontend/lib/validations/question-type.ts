import { IdentifyChoice } from '@prisma/client';
import { z } from 'zod';

export const ChoiceSchema = z.object({
  content: z.string().min(1, {
    message: 'Content Choice is required'
  }),
  isCorrect: z.boolean(),
  explanation: z.string().optional()
});

export const MultiOneSchema = z.object({
  title: z.string().min(1, {
    message: 'Title Multiple Choice is required'
  }),
  choiceId: z.string()
});

export const MultiMoreSchema = z.object({
  title: z.string().min(1, {
    message: 'Title Multiple Choice is required'
  }),
  choiceIdList: z.array(z.string())
});

export const IdentifyInfoSchema = z.object({
  title: z.string().min(1),
  choiceCorrect: z.enum([
    IdentifyChoice.TRUE,
    IdentifyChoice.FALSE,
    IdentifyChoice.NOT_GIVEN
  ])
});

export const MatchingHeadingSchema = z.object({
  title: z.string().min(1, {
    message: 'Title Multiple Choice is required'
  }),
  headingItems: z.array(z.string().min(1))
});

export const MatchingChoiceListSchema = z.object({
  titleForQuestion: z.string().optional(),
  matchingChoiceList: z.array(z.string().min(1))
});

export const CompletionAnswerSchema = z.object({
  questions: z.array(
    z.object({
      correctAnswer: z.string(),
      explain: z.string().optional()
    })
  )
});
