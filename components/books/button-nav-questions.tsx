import { PartExtended } from "@/types/db";
import { Button } from "../ui/button";
import { useContext } from "react";
import { ExamContext } from "@/global/exam-context";
import { ArrowLeft, ArrowRight } from "lucide-react";

function ButtonNavigateQuestions({
  part,
  partIndex,
}: {
  part: PartExtended;
  partIndex: number;
}) {
  const {
    currentQuestionIndex,
    questionRefs,
    setCurrentQuestionIndex,
    selectedAssessment,
    setActiveTab,
  } = useContext(ExamContext);
  if (!selectedAssessment) {
    return null;
  }

  const isHasNextQuestion = currentQuestionIndex < questionRefs.length - 1;
  const isHasPrevQuestion = currentQuestionIndex > 0;
  const handleNextQuestion = (part: PartExtended, i: number) => {
    if (
      currentQuestionIndex + 1 <
      part.questionGroups[part.questionGroups.length - 1].endQuestionNumber
    ) {
      questionRefs[currentQuestionIndex + 1].current?.focus();
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      if (i < selectedAssessment.parts.length - 1) {
        setCurrentQuestionIndex(
          selectedAssessment.parts[i + 1].questionGroups[0]
            .startQuestionNumber - 1
        );
        setActiveTab(String(selectedAssessment.parts[i + 1].id));
      } else {
        setActiveTab("delivering");
      }
    }
  };

  const handlePrevQuestion = (part: PartExtended, i: number) => {
    if (currentQuestionIndex >= part.questionGroups[0].startQuestionNumber) {
      questionRefs[currentQuestionIndex - 1].current?.focus();
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      setActiveTab(String(selectedAssessment.parts[i - 1].id));
      setCurrentQuestionIndex(
        selectedAssessment.parts[i - 1].questionGroups[0].startQuestionNumber -
          1
      );
    }
  };
  return (
    <div className="absolute inset-0 h-20">
      <Button
        onClick={() => handlePrevQuestion(part, partIndex)}
        disabled={!isHasPrevQuestion}
        size="xl"
      >
        <ArrowLeft />
      </Button>
      <Button
        onClick={() => handleNextQuestion(part, partIndex)}
        disabled={!isHasNextQuestion}
        size="xl"
      >
        <ArrowRight />
      </Button>
    </div>
  );
}

export default ButtonNavigateQuestions;
