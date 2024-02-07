"use client";
import { RefObject, useContext } from "react";
import { InputGap } from "../ui/input";
import { ExamContext } from "@/global/exam-context";

function BlankRender({ questionNumber }: { questionNumber: number }) {
  const { setCurrentQuestionIndex, userAnswers, setUserAnswers, questionRefs } =
    useContext(ExamContext);
  return (
    <InputGap
    className="inline-block"
      onFocus={() => {
        setCurrentQuestionIndex(questionNumber - 1);
      }}
      defaultValue={userAnswers[questionNumber] || ""}
      placeholder="Enter a word"
      onChange={(event) => {
        setUserAnswers((prevAnswers) => ({
          ...prevAnswers,
          [questionNumber]: event.target.value,
        }));
      }}
      ref={questionRefs[questionNumber - 1] as RefObject<HTMLInputElement>}
    />
  );
}

export default BlankRender;
