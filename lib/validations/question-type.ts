import { z } from 'zod'

export const ChoiceSchema = z.object({
  content: z.string().min(1, {
    message: 'Content Choice is required',
  }),
})

export const MultiOneSchema = z.object({
  title: z.string().min(1, {
    message: 'Title Multiple Choice is required',
  }),
  choiceId: z.string(),
})

export const MultiMoreSchema = z.object({
  title: z.string().min(1, {
    message: 'Title Multiple Choice is required',
  }),
  expectedAnswers: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: 'You have to select at least one item.',
    }),
  explanation: z.string().optional(),
})

export const MatchingHeadingSchema = z.object({
  title: z.string().min(1, {
    message: 'Title Multiple Choice is required',
  }),
  headingItems: z.array(z.string().min(1)),
})

export const ListMatchingChoicesSchema = z.object({
  title: z.string().optional(),
  matchingChoices: z.array(z.string().min(1)),
})
