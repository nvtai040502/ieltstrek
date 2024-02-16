import { Dispatch, RefObject, SetStateAction, createContext } from 'react';
import { IdentifyChoice } from '@prisma/client';
import { AssessmentExtended, PartExtended } from '@/types/test-exam';
import { ModeType } from '@/lib/validations/params';

export type AnswerType =
  | {
      questionId: string;
      type: 'MULTIPLE_CHOICE_ONE_ANSWER';
      choiceId: string;
    }
  | {
      questionId: string;
      type: 'MULTI_MORE';
      choiceIdList: string[];
    }
  | {
      questionId: string;
      type: 'IDENTIFY_INFO';
      content: IdentifyChoice;
    };
// | {
//     questionId: string
//     type: 'NOTE_COMPLETION'
//     content: string
//   }
// | {
//     questionId: string
//     type: 'MATCHING'
//     content: string
//     matchingChoiceId: string
//   }

interface ExamContextProps {
  activeTab: string;
  selectedAssessment: AssessmentExtended | null;
  questionRefs: RefObject<HTMLDivElement>[];
  currentRef: number;
  selectedPart: PartExtended | null;
  timeRemaining: number;
  mode: ModeType | null;
  isSubmit: boolean;
  setIsSubmit: Dispatch<SetStateAction<boolean>>;
  setMode: Dispatch<SetStateAction<ModeType | null>>;
  setTimeRemaining: Dispatch<SetStateAction<number>>;
  setSelectedPart: Dispatch<SetStateAction<PartExtended | null>>;
  setCurrentRef: Dispatch<SetStateAction<number>>;
  setQuestionRefs: Dispatch<SetStateAction<RefObject<HTMLDivElement>[]>>;
  setSelectedAssessment: Dispatch<SetStateAction<AssessmentExtended | null>>;
  setActiveTab: Dispatch<SetStateAction<string>>;
  listHeading: string[];
  setListHeading: Dispatch<SetStateAction<string[]>>;
  userAnswers: AnswerType[];
  setUserAnswers: Dispatch<SetStateAction<AnswerType[]>>;
}

export const ExamContext = createContext<ExamContextProps>({
  activeTab: '',
  selectedAssessment: null,
  questionRefs: [],
  userAnswers: [],
  listHeading: [],
  timeRemaining: 0,
  mode: null,
  isSubmit: false,
  setIsSubmit: () => {},
  setMode: () => {},
  setTimeRemaining: () => {},
  selectedPart: null,
  setSelectedPart: () => {},
  setListHeading: () => {},
  setUserAnswers: () => {},
  currentRef: 0,
  setCurrentRef: () => {},
  setQuestionRefs: () => {},
  setSelectedAssessment: () => {},
  setActiveTab: () => {}
});
