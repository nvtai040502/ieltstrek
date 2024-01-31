import { Assessment, Choice, MultipleChoice, Part, Passage, Question, QuestionGroup, SummaryCompletion } from "@prisma/client";

export type PartExtended = Part & {
  passage: Passage | null;
  questionGroups: QuestionGroupExtended[]
};
export type QuestionExtended = Question & {
  multipleChoice?: MultipleChoiceExtended | null;
  summaryCompletion?: SummaryCompletion | null;
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