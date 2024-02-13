import {
  Assessment,
  Choice,
  MultipleChoiceOneAnswer,
  Part,
  Passage,
  Question,
  QuestionGroup
} from '@prisma/client';

export type AssessmentExtended = Assessment & {
  parts: PartExtended[];
};
export type PassageExtended = Passage & {
  // passageMultiHeadingArray: PassageMultiHeadingExtended[]
};

export type PartExtended = Part & {
  passage: PassageExtended | null;
  questionGroups: QuestionGroupExtended[];
  questions: Question[];
};

export type QuestionGroupExtended = QuestionGroup & {
  multiOneList: MultiOneExtended[];
  // summaryCompletion?: SummaryCompletionExtended | null
  // identifyingInformation?: IdentifyingInformationExtended | null
  // noteCompletion?: NoteCompletionExtended | null
  // multiMoreArray: MultiMoreExtended[]
  // matchingHeading?: MatchingHeadingExtended | null
  // listMatchingChoices?: ListMatchingChoicesExtended | null
  // matchingSentence?: MatchingSentenceExtended | null
};
export type MultiOneExtended = MultipleChoiceOneAnswer & {
  choices: Choice[];
  question: Question;
};
