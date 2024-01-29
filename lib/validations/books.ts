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

export const UpdatePassageSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  imageHeader: z.string().optional(),
  description: z.string().optional(),
  numberQuestions: z.number().optional()
})

export const CreateQuestionSchema = z.object({
  title: z.string().min(1, {
    message: "Title Question is required"
  }),
  description: z.string().min(1, {
    message: "Description Question is required"
  }),
  headerForScorableItems: z.string().optional(),
  // description: z.string().optional(),
})
export const UpdateQuestionSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  headerForScorableItems: z.string().optional(),
  // description: z.string().optional(),
})