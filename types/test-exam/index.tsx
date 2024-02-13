import {
  Assessment,
  Choice,
  MultipleChoiceMoreAnswers,
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
  multiMoreList: MultiMoreExtended[];

  // summaryCompletion?: SummaryCompletionExtended | null
  // identifyingInformation?: IdentifyingInformationExtended | null
  // noteCompletion?: NoteCompletionExtended | null
  // matchingHeading?: MatchingHeadingExtended | null
  // listMatchingChoices?: ListMatchingChoicesExtended | null
  // matchingSentence?: MatchingSentenceExtended | null
};
export type MultiOneExtended = MultipleChoiceOneAnswer & {
  choices: Choice[];
  question: Question;
};
export type MultiMoreExtended = MultipleChoiceMoreAnswers & {
  choices: Choice[];
  question: Question;
};
