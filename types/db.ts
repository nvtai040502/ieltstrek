import {
  Assessment,
  Blank,
  Choice,
  IdentifyingInformation,
  IdentifyingInformationItem,
  MultipleChoice,
  NoteCompletion,
  NoteCompletionGroupItem,
  NoteCompletionItem,
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
  identifyingInformation?: IdentifyingInformationExtended | null;
  noteCompletion?: NoteCompletionExtended | null
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
  question: Question
}
export type NoteCompletionItemExtended = NoteCompletionItem & {
  blank: BlankExtended | null
}
export type NoteCompletionGroupItemExtended = NoteCompletionGroupItem & {
  noteCompletionItems: NoteCompletionItemExtended[]
}
export type NoteCompletionExtended = NoteCompletion & {
  noteCompletionGroupItemArray: NoteCompletionGroupItemExtended[]
  questionGroup: QuestionGroup
}

export type AssessmentExtended = Assessment & {
  parts: PartExtended[];
  questions: Question[];
};
