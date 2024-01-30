import { Assessment, Choice, MultipleChoice, Part, Passage, Question, ScorableItem, ShortAnswer } from "@prisma/client";

export type PartExtended = Part & {
  passage: Passage | null;
  questions: QuestionExtended[]
};
export type ScorableItemExtended = ScorableItem & {
  multipleChoice?: MultipleChoiceExtended | null;
  shortAnswer?: ShortAnswer | null;
};
export type MultipleChoiceExtended = MultipleChoice & {
  choices: Choice[]
}

export type QuestionExtended = Question & {
  scorableItems: ScorableItemExtended[]
}

export type AssessmentExtended = Assessment & {
  parts: PartExtended[];
};