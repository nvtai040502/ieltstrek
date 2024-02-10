import {
  Assessment,
  Blank,
  Choice,
  IdentifyingInformation,
  IdentifyingInformationItem,
  MatchingHeading,
  MatchingHeadingItem,
  MultipleChoice,
  MultipleChoiceMoreAnswers,
  NoteCompletion,
  Part,
  Passage,
  PassageMultiHeading,
  Question,
  QuestionGroup,
  SummaryCompletion,
  SummaryCompletionItem,
} from "@prisma/client";

export type PartExtended = Part & {
  passage: PassageExtended | null;
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
export type MatchingHeadingExtended = MatchingHeading & {
  matchingHeadingItemArray: MatchingHeadingItem[];
};
export type PassageMultiHeadingExtended = PassageMultiHeading & {
  matchingHeadingItem?: MatchingHeadingItem;
  question?: Question | null;
};
export type PassageExtended = Passage & {
  passageMultiHeadingArray: PassageMultiHeadingExtended[];
};

export type QuestionGroupExtended = QuestionGroup & {
  multipleChoiceArray: MultiOneExtended[];
  summaryCompletion?: SummaryCompletionExtended | null;
  identifyingInformation?: IdentifyingInformationExtended | null;
  noteCompletion?: NoteCompletionExtended | null;
  multiMoreArray: MultiMoreExtended[];
  matchingHeading?: MatchingHeadingExtended | null;
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
