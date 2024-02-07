import {
  Assessment,
  Blank,
  Choice,
  IdentifyingInformation,
  IdentifyingInformationItem,
  MultipleChoice,
  MultipleChoiceExpectedAnswer,
  NoteCompletion,
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
  expectedAnswers: MultipleChoiceExpectedAnswer[]
};

export type QuestionGroupExtended = QuestionGroup & {
  multipleChoiceArray: MultipleChoiceExtended[];
  summaryCompletion?: SummaryCompletionExtended | null;
  identifyingInformation?: IdentifyingInformationExtended | null;
  noteCompletion?: NoteCompletionExtended | null;
};
export type SummaryCompletionItemExtended = SummaryCompletionItem & {
  question: Question;
};
export type IdentifyingInformationItemExtended = IdentifyingInformationItem & {
  question: Question;
};
export type SummaryCompletionExtended = SummaryCompletion & {
  summaryCompletionItems: SummaryCompletionItemExtended[];
};
export type IdentifyingInformationExtended = IdentifyingInformation & {
  identifyingInformationItems: IdentifyingInformationItemExtended[];
};

export type BlankExtended = Blank & {
  question: Question;
};

export type NoteCompletionExtended = NoteCompletion & {
  blanks: BlankExtended[];
  questionGroup: QuestionGroup;
};

export type AssessmentExtended = Assessment & {
  parts: PartExtended[];
  questions: Question[];
};
