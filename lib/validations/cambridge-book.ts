import * as z from "zod";
export const CambridgeBookSchema = z.object({
  version: z.coerce.number(),
  imageCover: z.string().optional()
})

export const TestSchema = z.object({
  number: z.coerce.number(),
  sessionType: z.string(),
  cambridgeBookId: z.string()
})