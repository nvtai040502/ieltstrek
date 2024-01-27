import * as z from "zod";
export const CambridgeBookSchema = z.object({
  version: z.coerce.number(),
  imageCover: z.string().optional()
})