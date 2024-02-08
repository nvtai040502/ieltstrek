import { z } from "zod";

export const MultiOneSchema = z.object({
  title: z.string().min(1, {
    message: "Title Multiple Choice is required",
  }),
  expectedAnswer: z.string().min(1),
  explanation: z.string().optional(),
});

export const MultiMoreSchema = z.object({
  title: z.string().min(1, {
    message: "Title Multiple Choice is required",
  }),
  expectedAnswers: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    }),
  explanation: z.string().optional(),
});
