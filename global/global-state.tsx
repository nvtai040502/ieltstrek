'use client';

import { FC, RefObject, createRef, useEffect, useState } from 'react';
import { MatchingChoice } from '@prisma/client';
import { AssessmentExtended, PartExtended } from '@/types/test-exam';
import { ModeType } from '@/lib/validations/params';
import { DndContext } from './dnd-context';
import { EditContext, EditData, EditType } from './edit-context';
import { AnswerType, ExamContext } from './exam-context';

interface GlobalStateProps {
  children: React.ReactNode;
}

export const GlobalState: FC<GlobalStateProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<string>('');
  const [selectedPart, setSelectedPart] = useState<PartExtended | null>(null);
  const [selectedAssessment, setSelectedAssessment] =
    useState<AssessmentExtended | null>(null);
  const [questionRefs, setQuestionRefs] = useState<RefObject<HTMLDivElement>[]>(
    []
  );
  const [currentRef, setCurrentRef] = useState<number>(0);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<AnswerType[]>([]);
  const [textNoteCompletion, setTextNoteCompletion] = useState('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [type, setType] = useState<EditType>(null);
  const [data, setData] = useState<EditData | undefined>(undefined);
  const [listHeading, setListHeading] = useState<string[]>([]);

  const [questionGroupId, setQuestionGroupId] = useState<string>('');
  const [questionId, setQuestionId] = useState('');
  const [prevContent, setPrevContent] = useState('');
  const [matchingChoiceId, setMatchingChoiceId] = useState('');
  const [mode, setMode] = useState<ModeType | null>(null);
  const [matchingChoiceList, setMatchingChoiceList] = useState<
    MatchingChoice[]
  >([]);
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    if (!selectedAssessment || selectedPart || !mode) return;

    setTimeRemaining(3600);
    setQuestionRefs(() =>
      Array.from({ length: selectedAssessment.totalQuestions }, () =>
        createRef<HTMLDivElement>()
      )
    );
    setActiveTab(selectedAssessment.parts[0].id);
    setSelectedPart(selectedAssessment.parts[0]);
  }, [selectedAssessment, selectedPart, mode]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!selectedAssessment || !activeTab || !mode) return;

    const partIndex = selectedAssessment.parts.findIndex(
      (part) => part.id === activeTab
    );

    if (partIndex !== -1) {
      setSelectedPart(selectedAssessment.parts[partIndex]);

      const firstQuestionGroup =
        selectedAssessment.parts[partIndex].questionGroups[0];
      if (firstQuestionGroup) {
        setCurrentRef(firstQuestionGroup.startQuestionNumber - 1);
      }
    }
  }, [selectedAssessment, activeTab, mode]);

  return (
    <ExamContext.Provider
      value={{
        activeTab,
        selectedAssessment,
        questionRefs,
        userAnswers,
        currentRef,
        listHeading,
        selectedPart,
        timeRemaining,
        mode,
        isSubmit,
        setIsSubmit,
        setMode,
        setTimeRemaining,
        setSelectedPart,
        setListHeading,
        setUserAnswers,
        setCurrentRef,
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
        <DndContext.Provider
          value={{
            questionGroupId,
            matchingChoiceId,
            questionId,
            matchingChoiceList,
            prevContent,
            setPrevContent,
            setMatchingChoiceList,
            setQuestionId,
            setMatchingChoiceId,
            setQuestionGroupId
          }}
        >
          {children}
        </DndContext.Provider>
      </EditContext.Provider>
    </ExamContext.Provider>
  );
};
