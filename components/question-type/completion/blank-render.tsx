'use client';

import { RefObject, useContext } from 'react';
import { ExamContext } from '@/global/exam-context';
import { useExamHandler } from '@/global/use-exam-handler';
import { InputGap } from '@/components/ui/input';

function CompletionBlankRender({ questionNumber }: { questionNumber: number }) {
  const { questionRefs, currentRef, userAnswers, setCurrentRef } =
    useContext(ExamContext);
  const { handleAnswerChange } = useExamHandler();
  const answer = userAnswers.find(
    (answer) => answer.questionNumber === questionNumber
  );
  return (
    <InputGap
      className="inline-block"
      onFocus={() => {
        setCurrentRef(questionNumber - 1);
      }}
      value={answer && answer.type === 'COMPLETION' ? answer.content : ''}
      placeholder="Enter a word"
      onChange={(event) => {
        handleAnswerChange({
          questionNumber,
          type: 'COMPLETION',
          content: event.target.value
        });
      }}
      ref={questionRefs[questionNumber - 1] as RefObject<HTMLInputElement>}
    />
  );
}

export default CompletionBlankRender;
