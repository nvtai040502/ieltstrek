import { Assessment, Choice, MultipleChoice, Part, Passage, QuestionGroup, SummaryCompletion, SummaryCompletionItem } from "@prisma/client";

export type PartExtended = Part & {
  passage: Passage | null;
  questionGroups: QuestionGroupExtended[]
  multipleChoiceArray: MultipleChoice[]
};
export type MultipleChoiceExtended = MultipleChoice & {
  choices: Choice[]
}

export type QuestionGroupExtended = QuestionGroup & {
  multipleChoiceArray: MultipleChoiceExtended[];
  summaryCompletion?: SummaryCompletionExtended | null;
}
export type SummaryCompletionExtended = SummaryCompletion & {
  summaryCompletionItems: SummaryCompletionItem[];
}
export type AssessmentExtended = Assessment & {
  parts: PartExtended[];
};