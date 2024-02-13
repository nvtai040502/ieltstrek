import { Dispatch, SetStateAction, createContext } from 'react';
import {
  IdentifyingInformationItemExtended,
  MatchingHeadingExtended,
  MultiMoreExtended,
  MultiOneExtended,
  NoteCompletionExtended,
  SummaryCompletionExtended
} from '@/types/db';
import {
  ListMatchingChoicesExtended,
  MatchingSentenceExtended
} from '@/types/question-type';
import { PartExtended, QuestionGroupExtended } from '@/types/test-exam';
import { Choice, Passage, PassageMultiHeading } from '@prisma/client';

export type EditType =
  | 'editPart'
  // Question Type
  | 'editNoteCompletion'
  | 'editNoteCompletionGroupItem'
  | 'editIdentifyingInformationItem'
  | 'editChoice'
  | 'editMultiOne'
  | 'editSummaryCompletion'
  | 'editMultiMore'
  | 'editMatchingSentence'
  // Passage
  | 'editPassage'
  | 'createPassage'
  | 'editPassageMultiHeading'
  // Question Group
  | 'editQuestionGroup'
  | 'deleteQuestionGroup'
  | 'createQuestionGroup'
  | 'editMatchingHeading'
  | 'editListMatchingChoices'
  | 'createAssessment'
  | null;

export interface EditData {
  noteCompletion?: NoteCompletionExtended;
  identifyingInformationItem?: IdentifyingInformationItemExtended;
  choice?: Choice;
  multiOne?: MultiOneExtended;
  questionGroup?: QuestionGroupExtended;
  summaryCompletion?: SummaryCompletionExtended;
  multiMore?: MultiMoreExtended;
  part?: PartExtended;
  passage?: Passage;
  passageMultiHeading?: PassageMultiHeading;
  matchingHeading?: MatchingHeadingExtended;
  matchingSentence?: MatchingSentenceExtended;
  listMatchingChoices?: ListMatchingChoicesExtended;
}

interface EditContextProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  data: EditData | undefined;
  setData: Dispatch<SetStateAction<EditData | undefined>>;
  type: EditType;
  setType: Dispatch<SetStateAction<EditType>>;
  textNoteCompletion: string;
  setTextNoteCompletion: Dispatch<SetStateAction<string>>;
}

export const EditContext = createContext<EditContextProps>({
  isOpen: false,
  textNoteCompletion: '',
  setTextNoteCompletion: () => {},
  setIsOpen: () => {},
  data: undefined,
  setData: () => {},
  type: null,
  setType: () => {}
});
