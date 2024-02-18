import { DragEvent, useContext, useState } from 'react';
import { css } from '@emotion/css';
import { Droppable } from '@hello-pangea/dnd';
import { QuestionType } from '@prisma/client';
import { DndContext } from '@/global/dnd-context';
import { ExamContext } from '@/global/exam-context';
import { useDnd } from '@/global/use-dnd';
import { cn } from '@/lib/utils';

export function MatchingBlankRender({
  questionNumber
}: {
  questionNumber: number;
}) {
  const { userAnswers, selectedPart, questionRefs } = useContext(ExamContext);

  const { handleDragOver } = useDnd();
  const { setQuestionId } = useContext(DndContext);
  const {
    setCurrentRef: setCurrentQuestionIndex,
    currentRef: currentQuestionIndex
  } = useContext(ExamContext);
  const [isOver, setIsOver] = useState(false);

  const userAnswer = userAnswers.find(
    (prev) => prev.questionNumber === questionNumber
  );
  const question = selectedPart?.questions.find(
    (question) => question.questionNumber === questionNumber
  );
  if (!question) {
    return null;
  }

  const handleDrop = (event: DragEvent) => {
    event.preventDefault();
    // setQuestionId(questionId);
    setCurrentQuestionIndex(question.questionNumber - 1);
    const ref = questionRefs[question.questionNumber - 1].current;
    if (ref) {
      ref.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDragLeave = (event: DragEvent) => {
    event.preventDefault();
    setIsOver(false);
  };
  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      ref={questionRefs[question.questionNumber - 1]}
      className={cn(
        'border border-secondary-foreground w-full p-4',
        currentQuestionIndex === question.questionNumber - 1 ? 'bg-red-500' : ''
      )}
    >
      {/* {userAnswer && userAnswer.type === ""} */}
    </div>
  );
}
