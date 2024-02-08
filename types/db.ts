import {
  Assessment,
  Blank,
  Choice,
  IdentifyingInformation,
  IdentifyingInformationItem,
  MultipleChoice,
  MultipleChoiceMoreAnswers,
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
export type MultiOneExtended = MultipleChoice & {
  choices: Choice[];
  question: Question;
};
export type MultiMoreExtended = MultipleChoiceMoreAnswers & {
  choices: Choice[];
  question: Question;
};

export type QuestionGroupExtended = QuestionGroup & {
  multipleChoiceArray: MultiOneExtended[];
  summaryCompletion?: SummaryCompletionExtended | null;
  identifyingInformation?: IdentifyingInformationExtended | null;
  noteCompletion?: NoteCompletionExtended | null;
  multiMoreArray: MultiMoreExtended[];
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
