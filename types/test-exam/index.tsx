import {
  Assessment,
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
  // passage: PassageExtended | null
  questionGroups: QuestionGroupExtended[];
  questions: Question[];
};
export type QuestionGroupExtended = QuestionGroup & {
  // multipleChoiceArray: MultiOneExtended[]
  // summaryCompletion?: SummaryCompletionExtended | null
  // identifyingInformation?: IdentifyingInformationExtended | null
  // noteCompletion?: NoteCompletionExtended | null
  // multiMoreArray: MultiMoreExtended[]
  // matchingHeading?: MatchingHeadingExtended | null
  // listMatchingChoices?: ListMatchingChoicesExtended | null
  // matchingSentence?: MatchingSentenceExtended | null
};
