import {
  Assessment,
  Choice,
  Completion,
  IdentifyingInformation,
  Matching,
  MatchingChoice,
  MatchingChoiceGroup,
  MultipleChoiceMoreAnswers,
  MultipleChoiceOneAnswer,
  Part,
  Passage,
  PassageHeading,
  Question,
  QuestionGroup,
  QuestionType
} from '@prisma/client';

export type AssessmentExtended = Assessment & {
  parts: PartExtended[];
  questions: Question[];
};
export type PassageExtended = Passage & {
  passageHeadingList: PassageHeading[];
};

export type PartExtended = Part & {
  passage: PassageExtended | null;
  questionGroups: QuestionGroupExtended[];
  questions: Question[];
};

export type QuestionGroupExtended = QuestionGroup & {
  questions: Question[];

  multiOneList: MultiOneExtended[];
  multiMoreList: MultiMoreExtended[];
  identifyInfoList: IdentifyInfoExtended[];
  completion?: CompletionExtended | null;
  matching?: MatchingExtended | null;
  matchingChoiceGroup?: MatchingChoiceGroupExtended | null;

  // identifyingInformation?: IdentifyingInformationExtended | null
  // matchingHeading?: MatchingHeadingExtended | null
};
export type MultiOneExtended = MultipleChoiceOneAnswer & {
  choices: Choice[];
  question: Question;
};
export type MultiMoreExtended = MultipleChoiceMoreAnswers & {
  choices: Choice[];
  question: Question;
};
export type IdentifyInfoExtended = IdentifyingInformation & {
  question: Question;
};
export type CompletionExtended = Completion & {
  questions: Question[];
};

export type MatchingExtended = Matching & {
  matchingChoiceGroup: MatchingChoiceGroupExtended;
};
export type MatchingChoiceGroupExtended = MatchingChoiceGroup & {
  matchingChoiceList: MatchingChoiceExtended[];
};
export type MatchingChoiceExtended = MatchingChoice & {
  question?: Question | null;
};
