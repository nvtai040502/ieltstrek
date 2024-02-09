import {
  IdentifyingInformationAnswer,
  PassageType,
  QuestionType,
} from "@prisma/client";
import * as z from "zod";

export const AssessmentSchema = z.object({
  bookName: z.string().optional(),
  imageCover: z.string().optional(),
  name: z.string().min(1, {
    message: "Assessment Name is required",
  }),
});

export const PartSchema = z.object({
  title: z.string().min(1, {
    message: "Title Passage is required",
  }),
  description: z.string().min(1, {
    message: "Title Passage is required",
  }),
});

export const PassageSchema = z.object({
  title: z.string().min(1, {
    message: "Title Passage is required",
  }),
  content: z.string().optional(),
  image: z.string().optional(),
  description: z.string().optional(),
  type: z.enum([PassageType.PASSAGE_SIMPLE, PassageType.PASSAGE_MULTI_HEADING]),
});
export const PassageMultiHeadingSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});

export const SummaryCompletionSchema = z.object({
  title: z.string().optional(),
  paragraphWithBlanks: z.string().min(1, {
    message: "ParagraphWithBlanks is required",
  }),
  expectedAnswers: z.array(
    z.string().min(1, {
      message: "Expected answer is required",
    }),
  ),
});

export const IdentifyingInformationItemSchema = z.object({
  title: z.string().min(1, {
    message: "Title Identifying Information Item is required",
  }),
  expectedAnswer: z.enum([
    IdentifyingInformationAnswer.TRUE,
    IdentifyingInformationAnswer.FALSE,
    IdentifyingInformationAnswer.NOT_GIVEN,
  ]),
  explanation: z.string().optional(),
});
const TextNodeSchema = z.object({
  text: z.string(),
  bold: z.boolean().optional(),
  italic: z.boolean().optional(),
  underline: z.boolean().optional(),
  code: z.boolean().optional(),
});

const ParagraphNodeSchema = z.object({
  type: z.literal("paragraph"),
  children: z.array(TextNodeSchema),
});
const BlockQuoteNodeSchema = z.object({
  type: z.literal("block-quote"),
  children: z.array(TextNodeSchema),
});

const CenterAlignedParagraphNodeSchema = z.object({
  type: z.literal("paragraph"),
  align: z.literal("center"),
  children: z.array(TextNodeSchema),
});
export const NoteCompletionSchema = z.object({
  title: z.string().min(1),
});
