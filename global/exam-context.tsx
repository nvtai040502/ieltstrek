import { AssessmentExtended } from "@/types/db";
import { Assessment } from "@prisma/client";
import { Dispatch, RefObject, SetStateAction, createContext } from "react";

interface ExamContextProps {
  activeTab: string;
  selectedAssessment: AssessmentExtended | null;
  questionRefs: RefObject<HTMLDivElement | HTMLInputElement>[];
  setQuestionRefs: Dispatch<
    SetStateAction<RefObject<HTMLDivElement | HTMLInputElement>[]>
  >;
  setSelectedAssessment: Dispatch<SetStateAction<AssessmentExtended | null>>;
  setActiveTab: Dispatch<SetStateAction<string>>;
}
export const ExamContext = createContext<ExamContextProps>({
  activeTab: "",
  selectedAssessment: null,
  questionRefs: [],
  setQuestionRefs: () => {},
  setSelectedAssessment: () => {},
  setActiveTab: () => {},
});
