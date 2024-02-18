import { QuestionType } from '@prisma/client';
import { z } from 'zod';

export type QuestionGroupSchemaType = {
  title: string;
  description?: string;
  type: QuestionType;
  startQuestionNumber: number;
  endQuestionNumber: number;
} & (
  | {
      type: Exclude<QuestionType, 'TABLE_COMPLETION'>;
      numberColumns?: never;
      numberRows?: never;
    }
  | {
      type: 'TABLE_COMPLETION';
      numberColumns: number;
      numberRows: number;
    }
);

export const QuestionGroupSchema = z
  .object({
    title: z.string().min(1),
    description: z.string().optional(),
    type: z.enum([
      QuestionType.MULTIPLE_CHOICE_ONE_ANSWER,
      QuestionType.MULTIPLE_CHOICE_MORE_ANSWERS,
      QuestionType.IDENTIFYING_INFORMATION,
      QuestionType.COMPLETION,
      QuestionType.TABLE_COMPLETION,
      QuestionType.MATCHING_HEADING,
      QuestionType.MATCHING
    ]),
    numberColumns: z.coerce.number().optional(),
    numberRows: z.coerce.number().optional(),
    startQuestionNumber: z.coerce.number().min(1),
    endQuestionNumber: z.coerce.number().min(1)
  })
  .refine(
    (data) => {
      if (data.endQuestionNumber <= data.startQuestionNumber) {
        return false;
      }

      return true;
    },
    {
      message: 'End question must be larger than start question',
      path: ['endQuestionNumber']
    }
  )
  .refine(
    (data) => {
      if (data.endQuestionNumber > 40) {
        return false;
      }
      return true;
    },
    {
      message: 'in Reading section The endQuestionNumber must be 40 or fewer.',
      path: ['endQuestionNumber']
    }
  )
  .refine(
    (data) => {
      if (
        data.type === QuestionType.TABLE_COMPLETION &&
        (typeof data.numberColumns !== 'number' ||
          typeof data.numberRows !== 'number')
      ) {
        return false;
      }
      return true;
    },
    {
      message:
        'For TABLE_COMPLETION type, numberColumns and numberRows must be provided',
      path: ['type']
    }
  );
