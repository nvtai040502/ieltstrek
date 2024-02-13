'use client';

import { FC, RefObject, createRef, useEffect, useState } from 'react';
import { EditContext, EditData, EditType } from './edit-context';
import { ExamContext } from './exam-context';
import { AssessmentExtended, PartExtended } from '@/types/test-exam';
import { MatchingHeadingItem } from '@prisma/client';

interface GlobalStateProps {
  children: React.ReactNode;
}

export const GlobalState: FC<GlobalStateProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<string>('');
  const [selectedPart, setSelectedPart] = useState<PartExtended | null>(null);
  const [selectedAssessment, setSelectedAssessment] =
    useState<AssessmentExtended | null>(null);
  const [questionRefs, setQuestionRefs] = useState<
    RefObject<HTMLDivElement | HTMLInputElement>[]
  >([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<{
    [key: string]: string | string[];
  }>({});
  const [textNoteCompletion, setTextNoteCompletion] = useState('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [type, setType] = useState<EditType>(null);
  const [data, setData] = useState<EditData | undefined>(undefined);
  const [listHeading, setListHeading] = useState<string[]>([]);
  useEffect(() => {
    if (!selectedAssessment) {
      return;
    }
    setQuestionRefs((prevRefs) =>
      Array.from({ length: selectedAssessment.questions.length }, (_, index) =>
        index < prevRefs.length
          ? prevRefs[index]
          : createRef<HTMLDivElement | HTMLInputElement>()
      )
    );
    setActiveTab(String(selectedAssessment.parts[0].id));
    setSelectedPart(selectedAssessment.parts[0]);
  }, [selectedAssessment]);
  useEffect(() => {
    if (!selectedAssessment || !activeTab) {
      return;
    }
    const partIndex = selectedAssessment.parts.findIndex(
      (part) => part.id === activeTab
    );
    if (partIndex === -1) {
      setSelectedPart(null);
    } else {
      setSelectedPart(selectedAssessment.parts[partIndex]);
    }
  }, [selectedAssessment, activeTab]);

  return (
    <ExamContext.Provider
      value={{
        activeTab,
        selectedAssessment,
        questionRefs,
        userAnswers,
        currentQuestionIndex,
        listHeading,
        selectedPart,
        setSelectedPart,
        setListHeading,
        setUserAnswers,
        setCurrentQuestionIndex,
        setQuestionRefs,
        setSelectedAssessment,
        setActiveTab
      }}
    >
      <EditContext.Provider
        value={{
          isOpen,
          textNoteCompletion,
          setTextNoteCompletion,
          setData,
          setIsOpen,
          setType,
          type,
          data
        }}
      >
        {children}
      </EditContext.Provider>
    </ExamContext.Provider>
  );
};
