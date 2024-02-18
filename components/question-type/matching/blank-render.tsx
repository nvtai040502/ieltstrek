import { DragEvent, useContext, useState } from 'react';
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

  const { handleDragOver, handleDragLeave } = useDnd();
  const { questionId } = useContext(DndContext);
  const {
    setCurrentRef: setCurrentQuestionIndex,
    currentRef: currentQuestionIndex
  } = useContext(ExamContext);
  const [isOver, setIsOver] = useState(false);

  const answer = userAnswers.find(
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
    setCurrentQuestionIndex(question.questionNumber - 1);
    const ref = questionRefs[question.questionNumber - 1].current;
    if (ref) {
      ref.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <>
      {answer && answer.type === 'MATCHING' && answer.content ? (
        <div
          onDrop={handleDrop}
          onDragOver={(event) =>
            handleDragOver({ event, type: 'question', questionId: question.id })
          }
          draggable
          onDragLeave={handleDragLeave}
          ref={questionRefs[question.questionNumber - 1]}
          className={cn('border-4 border-dotted w-full p-4')}
        >
          {answer.content}
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={(event) =>
            handleDragOver({ event, type: 'question', questionId: question.id })
          }
          onDragLeave={handleDragLeave}
          ref={questionRefs[question.questionNumber - 1]}
          className={cn(
            'border-4 border-dotted  w-full p-4',
            questionId === question.id ? 'bg-secondary' : ' ',
            currentQuestionIndex === question.questionNumber - 1
              ? ' '
              : 'border-secondary'
          )}
        />
      )}
    </>
  );
}
