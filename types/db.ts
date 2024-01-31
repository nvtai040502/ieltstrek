import { Assessment, Choice, MultipleChoice, Part, Passage, QuestionGroup, SummaryCompletion } from "@prisma/client";

export type PartExtended = Part & {
  passage: Passage | null;
  questionGroups: QuestionGroupExtended[]
};
export type MultipleChoiceExtended = MultipleChoice & {
  choices: Choice[]
}

export type QuestionGroupExtended = QuestionGroup & {
  multipleChoiceArray: MultipleChoiceExtended[];
  summaryCompletion?: SummaryCompletion | null;
}

export type AssessmentExtended = Assessment & {
  parts: PartExtended[];
};