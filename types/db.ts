import { Assessment, Part, Passage } from "@prisma/client";

export type PartWithPassage = Part & {
  passage: Passage | null;
};

export type AssessmentExtended = Assessment & {
  parts: PartWithPassage[];
};