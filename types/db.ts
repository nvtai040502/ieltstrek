import { Assessment, Choice, MultipleChoice, Part, Passage, Question, QuestionGroup, ShortAnswer } from "@prisma/client";

export type PartExtended = Part & {
  passage: Passage | null;
  questionGroups: QuestionGroupExtended[]
};
export type QuestionExtended = Question & {
  multipleChoice?: MultipleChoiceExtended | null;
  shortAnswer?: ShortAnswer | null;
};
export type MultipleChoiceExtended = MultipleChoice & {
  choices: Choice[]
}

export type QuestionGroupExtended = QuestionGroup & {
  questions: QuestionExtended[]
}

export type AssessmentExtended = Assessment & {
  parts: PartExtended[];
};