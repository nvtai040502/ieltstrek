import { QuestionType } from "@prisma/client";
import * as z from "zod";


export const AssessmentSchema = z.object({
  bookName: z.string().optional(),
  imageCover: z.string().optional(),
  name: z.string().min(1, {
    message: "Assessment Name is required"
  })
})


export const PartSchema = z.object({
  title: z.string().min(1, {
    message: "Title Passage is required"
  }),
  description: z.string().min(1, {
    message: "Title Passage is required"
  }),
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



export const MultipleChoiceSchema = z.object({
  title: z.string().min(1, {
    message: "Title Multiple Choice is required"
  }),
})
export const ShortAnswerSchema = z.object({
  sentence: z.string().min(1, {
    message: "Sentence ShortAnswer is required"
  }),
  blank: z.string().optional(),
  explanation: z.string().optional()
})
