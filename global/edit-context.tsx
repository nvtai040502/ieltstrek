import { Dispatch, SetStateAction, createContext } from 'react';
import { Assessment, Choice, Passage, PassageHeading } from '@prisma/client';
import {
  CompletionExtended,
  IdentifyInfoExtended,
  MultiMoreExtended,
  MultiOneExtended,
  PartExtended,
  QuestionGroupExtended
} from '@/types/test-exam';

export type EditType =
  | 'editPart'
  | 'openAssessment'
  // Question Type
  | 'editIdentifyInfo'
  | 'editChoice'
  | 'editMultiOne'
  | 'editCompletionParagraph'
  | 'editCompletionAnswer'
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

interface MultiOneChoice {
  type: 'MULTI_ONE';
  multiOneId: string;
  choice: Choice;
}

interface MultiMoreChoice {
  type: 'MULTI_MORE';
  multiMoreId: string;
  choice: Choice;
}

export type ChoiceData = MultiOneChoice | MultiMoreChoice;

export interface EditData {
  part?: PartExtended;
  questionGroup?: QuestionGroupExtended;
  choiceData?: ChoiceData;
  multiOne?: MultiOneExtended;
  multiMore?: MultiMoreExtended;
  identifyInfo?: IdentifyInfoExtended;
  passage?: Passage;
  passageHeading?: PassageHeading;
  assessment?: Assessment;
  completion?: CompletionExtended;

  // summaryCompletion?: SummaryCompletionExtended;
  // matchingHeading?: MatchingHeadingExtended;
  // matchingSentence?: MatchingSentenceExtended;
  // listMatchingChoices?: ListMatchingChoicesExtended;
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
