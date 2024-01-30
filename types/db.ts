import { Assessment, Choice, MultipleChoice, Part, Passage, QuestionGroup, ScorableItem, ShortAnswer } from "@prisma/client";

export type PartExtended = Part & {
  passage: Passage | null;
  questionGroups: QuestionGroupExtended[]
};
export type ScorableItemExtended = ScorableItem & {
  multipleChoice?: MultipleChoiceExtended | null;
  shortAnswer?: ShortAnswer | null;
};
export type MultipleChoiceExtended = MultipleChoice & {
  choices: Choice[]
}

export type QuestionGroupExtended = QuestionGroup & {
  scorableItems: ScorableItemExtended[]
}

export type AssessmentExtended = Assessment & {
  parts: PartExtended[];
};