import { Assessment, Part, Passage, Question, ScorableItem } from "@prisma/client";

export type PartExtended = Part & {
  passage: Passage | null;
  questions: QuestionExtended[]
};

export type QuestionExtended = Question & {
  scorableItems: ScorableItem[]
}

export type AssessmentExtended = Assessment & {
  parts: PartExtended[];
};