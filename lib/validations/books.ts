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
    message: "Part title is required"
  }),
  description: z.string().min(1, {
    message: "Part description is required"
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