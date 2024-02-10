import { AssessmentExtended } from "@/types/db";
import { MatchingHeadingItem } from "@prisma/client";
import { Dispatch, RefObject, SetStateAction, createContext } from "react";

interface ExamContextProps {
  activeTab: string;
  selectedAssessment: AssessmentExtended | null;
  questionRefs: RefObject<HTMLDivElement | HTMLInputElement>[];
  currentQuestionIndex: number;
  setCurrentQuestionIndex: Dispatch<SetStateAction<number>>;
  setQuestionRefs: Dispatch<
    SetStateAction<RefObject<HTMLDivElement | HTMLInputElement>[]>
  >;
  setSelectedAssessment: Dispatch<SetStateAction<AssessmentExtended | null>>;
  setActiveTab: Dispatch<SetStateAction<string>>;
  listHeading: string[];
  setListHeading: Dispatch<SetStateAction<string[]>>;
  userAnswers: { [key: string]: string | string[] };
  setUserAnswers: Dispatch<
    SetStateAction<{ [key: string]: string | string[] }>
  >;
}

export const ExamContext = createContext<ExamContextProps>({
  activeTab: "",
  selectedAssessment: null,
  questionRefs: [],
  userAnswers: {},
  listHeading: [],
  setListHeading: () => {},
  setUserAnswers: () => {},
  currentQuestionIndex: 0,
  setCurrentQuestionIndex: () => {},
  setQuestionRefs: () => {},
  setSelectedAssessment: () => {},
  setActiveTab: () => {},
});
