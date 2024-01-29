import { QuestionType } from "@prisma/client";
import * as z from "zod";


export const AssessmentSchema = z.object({
  bookName: z.string().optional(),
  imageCover: z.string().optional(),
  name: z.string().min(1, {
    message: "Assessment Name is required"
  })
})


export const UpdatePartSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  numberQuestions: z.coerce.number().optional(),
})



export const PassageSchema = z.object({
  title: z.string().min(1, {
    message: "Title Passage is required"
  }),
  content: z.string().min(1, {
    message: "Content Passage is required"
  }),
  imageHeader: z.string().optional(),
  description: z.string().optional(),
})

export const QuestionSchema = z.object({
  content: z.string().min(1, {
    message: "Content Question is required"
  }),
  type: z.enum([
    QuestionType.MULTIPLE_CHOICE, 
    QuestionType.SHORT_ANSWER,
  ]),
  scorableItemsCount: z.coerce.number().min(1),
  headerForItems: z.string().optional()
})

export const ChoiceSchema = z.object({
  content: z.string().min(1, {
    message: "Content Choice is required"
  }),
  isCorrect: z.boolean(),
  explanation: z.string().optional()
})



export const ScorableItemSchema = z.object({
  content: z.string().min(1, {
    message: "Content ScorableItem is required"
  }),
})
