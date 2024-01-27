import * as z from "zod";


export const TestSchema = z.object({
  bookName: z.string().min(5, {
    message: "Book name should be at lease 5 characters",
  }),
  bookImageCover: z.string().nullable(),
  testNumber: z.coerce.number().min(1, {
    message: "Test number should be larger than 1",
  })
})


export const PartSchema = z.object({
  name: z.string(),
  testId: z.string()
})