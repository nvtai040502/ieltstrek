'use client';

import { InputGap } from '@/components/ui/input';

function CompletionBlankRender({ questionNumber }: { questionNumber: number }) {
  return (
    <InputGap
      className="inline-block"
      // onFocus={() => {
      //   setCurrentQuestionIndex(questionNumber - 1);
      // }}
      // defaultValue={userAnswers[questionNumber] || ''}
      placeholder="Enter a word"
      // onChange={(event) => {
      //   setUserAnswers((prevAnswers) => ({
      //     ...prevAnswers,
      //     [questionNumber]: event.target.value
      //   }));
      // }}
      // ref={questionRefs[questionNumber - 1] as RefObject<HTMLInputElement>}
    />
  );
}

export default CompletionBlankRender;
