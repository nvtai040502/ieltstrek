import { Dispatch, SetStateAction, createContext } from 'react'
import { Choice, Passage, PassageMultiHeading } from '@prisma/client'
import {
  MultiOneExtended,
  PartExtended,
  QuestionGroupExtended,
} from '@/types/test-exam'

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
  | null

interface MultiOneChoice {
  type: 'MULTI_ONE'
  multiOneId: string
  choice: Choice
}

interface MultiMoreChoice {
  type: 'MULTI_MORE'
  multiMoreId: string
  choice: Choice
}

export type ChoiceData = MultiOneChoice | MultiMoreChoice

export interface EditData {
  choiceData?: ChoiceData
  multiOne?: MultiOneExtended
  questionGroup?: QuestionGroupExtended
  part?: PartExtended
  passage?: Passage
  passageMultiHeading?: PassageMultiHeading
  // summaryCompletion?: SummaryCompletionExtended;
  // multiMore?: MultiMoreExtended;
  // matchingHeading?: MatchingHeadingExtended;
  // matchingSentence?: MatchingSentenceExtended;
  // listMatchingChoices?: ListMatchingChoicesExtended;
}

interface EditContextProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  data: EditData | undefined
  setData: Dispatch<SetStateAction<EditData | undefined>>
  type: EditType
  setType: Dispatch<SetStateAction<EditType>>
  textNoteCompletion: string
  setTextNoteCompletion: Dispatch<SetStateAction<string>>
}

export const EditContext = createContext<EditContextProps>({
  isOpen: false,
  textNoteCompletion: '',
  setTextNoteCompletion: () => {},
  setIsOpen: () => {},
  data: undefined,
  setData: () => {},
  type: null,
  setType: () => {},
})
