import {
  Assessment,
  Choice,
  MultipleChoice,
  Part,
  Passage,
  Question,
  QuestionGroup,
  SummaryCompletion,
  SummaryCompletionItem,
} from "@prisma/client";

export type PartExtended = Part & {
  passage: Passage | null;
  questionGroups: QuestionGroupExtended[];
  questions: Question[];
};
export type MultipleChoiceExtended = MultipleChoice & {
  choices: Choice[];
  question: Question;
};

export type QuestionGroupExtended = QuestionGroup & {
  multipleChoiceArray: MultipleChoiceExtended[];
  summaryCompletion?: SummaryCompletionExtended | null;
};

export type SummaryCompletionItemExtended = SummaryCompletionItem & {
  question: Question;
};

export type SummaryCompletionExtended = SummaryCompletion & {
  summaryCompletionItems: SummaryCompletionItemExtended[];
};
export type AssessmentExtended = Assessment & {
  parts: PartExtended[];
  questions: Question[]
};
