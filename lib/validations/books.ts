import { QuestionType } from "@prisma/client";
import * as z from "zod";

export const AssessmentSchema = z.object({
  bookName: z.string().optional(),
  imageCover: z.string().optional(),
  name: z.string().min(1, {
    message: "Assessment Name is required",
  }),
});

export const PartSchema = z.object({
  title: z.string().min(1, {
    message: "Title Passage is required",
  }),
  description: z.string().min(1, {
    message: "Title Passage is required",
  }),
});

export const PassageSchema = z.object({
  title: z.string().min(1, {
    message: "Title Passage is required",
  }),
  content: z.string().min(1, {
    message: "Content Passage is required",
  }),
  imageHeader: z.string().optional(),
  description: z.string().optional(),
});

export const QuestionGroupSchema = z.object({
  title: z.string().min(1, {
    message: "Title for the Question Group is required",
  }),
  description: z.string().optional(),
  titleForQuestions: z.string().optional(),
  type: z.enum([
    QuestionType.MULTIPLE_CHOICE,
    QuestionType.SUMMARY_COMPLETION,
  ]),
  startQuestionNumber: z.coerce.number().min(1),
  endQuestionNumber: z.coerce.number().min(1),
})
  .refine((data) => {
    if (data.endQuestionNumber <= data.startQuestionNumber) {
      return false;
    }

    return true;
  }, {
    message: "End question must be larger than start question",
    path: ["endQuestionNumber"]
  })
  .refine((data) => {
    if ((data.endQuestionNumber - data.startQuestionNumber + 1) > 40) {
      return false;
    }
    return true;
  }, {
    message: "in Reading section The endQuestionNumber must be 40 or fewer.",
    path: ["endQuestionNumber"]
  })
 

export const ChoiceSchema = z.object({
  content: z.string().min(1, {
    message: "Content Choice is required",
  }),
  isCorrect: z.boolean(),
  explanation: z.string().optional(),
});

export const MultipleChoiceSchema = z.object({
  title: z.string().min(1, {
    message: "Title Multiple Choice is required",
  }),
});
export const SummaryCompletionSchema = z.object({
  title: z.string().optional(),
  paragraphWithBlanks: z.string().min(1, {
    message: "ParagraphWithBlanks is required",
  }),
  expectedAnswers: z.array(z.string().min(1, {
    message: "Expected answer is required",
  }))
});