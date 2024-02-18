import { DragEvent, useContext } from 'react';
import { DndContext } from './dnd-context';
import { AnswerType, ExamContext } from './exam-context';

export const useDnd = () => {
  const {
    matchingChoiceId,
    questionGroupId,
    setQuestionId,
    questionId,
    setChoiceGroupOver,
    setMatchingChoiceList,
    setMatchingChoiceId,
    setQuestionGroupId
  } = useContext(DndContext);
  const {
    selectedPart,
    setUserAnswers,
    userAnswers,
    setCurrentRef,
    questionRefs
  } = useContext(ExamContext);
  const handleDragEnd = () => {
    setChoiceGroupOver(false);

    const questionGroup = selectedPart?.questionGroups.find(
      (questionGroup) => questionGroup.id === questionGroupId
    );

    if (!questionGroup) {
      return;
    }

    const question = questionGroup.questions.find(
      (question) => question.id === questionId
    );

    if (!question) {
      return;
    }

    setQuestionId(null);

    const matchingChoice =
      questionGroup.matching?.matchingChoiceGroup.matchingChoiceList.find(
        (matchingChoice) => matchingChoice.id === matchingChoiceId
      );

    if (!matchingChoice) {
      return;
    }

    const existAnswer = userAnswers.find(
      (prev) => prev.questionNumber === question.questionNumber
    );

    if (existAnswer && existAnswer.type === 'MATCHING') {
      setMatchingChoiceList((prevList) =>
        prevList.map((choice) =>
          choice.id === matchingChoiceId
            ? { ...choice, content: '' }
            : choice.id === existAnswer.matchingChoiceId
              ? { ...choice, content: existAnswer.content }
              : choice
        )
      );
    } else {
      setMatchingChoiceList((prevList) =>
        prevList.map((choice) =>
          choice.id === matchingChoiceId ? { ...choice, content: '' } : choice
        )
      );
    }

    setUserAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      const findAnswerIndex = updatedAnswers.findIndex(
        (prev) =>
          prev.questionNumber === question.questionNumber &&
          prev.type === 'MATCHING'
      );
      if (findAnswerIndex !== -1) {
        updatedAnswers[findAnswerIndex] = {
          ...updatedAnswers[findAnswerIndex],
          type: 'MATCHING',
          content: matchingChoice.content,
          matchingChoiceId: matchingChoice.id
        };
      } else {
        updatedAnswers.push({
          questionNumber: question.questionNumber,
          type: 'MATCHING',
          matchingChoiceId: matchingChoice.id,
          content: matchingChoice.content
        });
      }
      return updatedAnswers;
    });
  };
  const handleDragStart = (
    questionGroupId: string,
    matchingChoiceId: string
  ) => {
    setQuestionGroupId(questionGroupId);
    setMatchingChoiceId(matchingChoiceId);
  };
  const handleDragOver = ({
    event,
    type,
    questionId
  }:
    | {
        event: DragEvent;
        type: 'question';
        questionId: string;
      }
    | {
        event: DragEvent;
        type: 'groupChoice';
        questionId?: never;
      }) => {
    event.preventDefault();
    if (type === 'groupChoice') {
      setChoiceGroupOver(true);
    }
    if (type === 'question') {
      setQuestionId(questionId);
    }
  };
  const handleDragLeave = (event: DragEvent) => {
    // event.preventDefault();
    setChoiceGroupOver(false);
    setQuestionId(null);
  };
  const handleDrop = ({
    event,
    quesNum
  }: {
    event: DragEvent;
    quesNum: number;
  }) => {
    event.preventDefault();
    setCurrentRef(quesNum - 1);
    const ref = questionRefs[quesNum - 1].current;
    if (ref) {
      ref.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return {
    handleDragEnd,
    handleDragStart,
    handleDragOver,
    handleDragLeave,
    handleDrop
  };
};
