import { Assessment, Choice, MultipleChoice, Part, Passage, Question, ScorableItem } from "@prisma/client";

export type PartExtended = Part & {
  passage: Passage | null;
  questions: QuestionExtended[]
};
export type ScorableItemExtended = ScorableItem & {
  multipleChoice: MultipleChoice | null;
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