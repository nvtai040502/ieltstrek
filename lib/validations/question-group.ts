import { QuestionType } from "@prisma/client";
import { z } from "zod";

export const QuestionGroupSchema = z
  .object({
    title: z.string().min(1),
    description: z.string().optional(),
    type: z.enum([
      QuestionType.MULTIPLE_CHOICE,
      QuestionType.MULTIPLE_CHOICE_MORE_ANSWERS,
      QuestionType.SUMMARY_COMPLETION,
      QuestionType.IDENTIFYING_INFORMATION,
      QuestionType.NOTE_COMPLETION,
      QuestionType.TABLE_COMPLETION,
      QuestionType.MATCHING_HEADING,
      QuestionType.MATCHING_SENTENCE,
    ]),
    numberColumns: z.coerce.number().optional(),
    numberRows: z.coerce.number().optional(),
    startQuestionNumber: z.coerce.number().min(1),
    endQuestionNumber: z.coerce.number().min(1),
  })
  .refine(
    (data) => {
      if (data.endQuestionNumber <= data.startQuestionNumber) {
        return false;
      }

      return true;
    },
    {
      message: "End question must be larger than start question",
      path: ["endQuestionNumber"],
    },
  )
  .refine(
    (data) => {
      if (data.endQuestionNumber - data.startQuestionNumber + 1 > 40) {
        return false;
      }
      return true;
    },
    {
      message: "in Reading section The endQuestionNumber must be 40 or fewer.",
      path: ["endQuestionNumber"],
    },
  );
