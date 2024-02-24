import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useExamHandler } from '@/global/use-exam-handler';
import { Button } from '@/components/ui/button';

function ButtonNavigationQuestion() {
  const {
    handleNextQuestion,
    handlePrevQuestion,
    isHasNextQuestion,
    isHasPrevQuestion
  } = useExamHandler();

  return (
    <div className="absolute bottom-8  right-4 h-20">
      <Button
        onClick={() => handlePrevQuestion()}
        disabled={!isHasPrevQuestion}
        size="xl"
      >
        <ArrowLeft />
      </Button>
      <Button
        onClick={() => handleNextQuestion()}
        disabled={!isHasNextQuestion}
        size="xl"
      >
        <ArrowRight />
      </Button>
    </div>
  );
}

export default ButtonNavigationQuestion;
