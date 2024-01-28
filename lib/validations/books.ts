import * as z from "zod";


export const AssessmentSchema = z.object({
  bookName: z.string().optional(),
  imageCover: z.string().optional(),
  name: z.string().min(1, {
    message: "Assessment Name is required"
  })
})


export const PassageSchema = z.object({
  title: z.string().min(1, {
    message: "Title Passage is required"
  }),
  content: z.string().min(1, {
    message: "Content Passage is required"
  }),
  imageHeader: z.string().nullable(),
  description: z.string().nullable(),
})