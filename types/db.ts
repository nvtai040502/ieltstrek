import { Assessment, Part, Passage, Question } from "@prisma/client";

export type PartExtended = Part & {
  passage: Passage | null;
  questions: Question[]
};

export type AssessmentExtended = Assessment & {
  parts: PartExtended[];
};