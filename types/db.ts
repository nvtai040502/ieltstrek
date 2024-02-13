import {
  ListMatchingChoicesExtended,
  MatchingSentenceExtended
} from './question-type';
import {
  Assessment,
  Blank,
  Choice,
  IdentifyingInformation,
  IdentifyingInformationItem,
  MatchingHeading,
  MatchingHeadingItem,
  MatchingSentence,
  MultipleChoice,
  MultipleChoiceMoreAnswers,
  NoteCompletion,
  Part,
  Passage,
  PassageMultiHeading,
  Question,
  QuestionGroup,
  SummaryCompletion,
  SummaryCompletionItem
} from '@prisma/client';

export type MatchingHeadingExtended = MatchingHeading & {
  matchingHeadingItemArray: MatchingHeadingItem[];
  passageHeadingArray: PassageMultiHeadingExtended[];
};
export type PassageMultiHeadingExtended = PassageMultiHeading & {
  matchingHeadingItem?: MatchingHeadingItem;
  question?: Question | null;
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


