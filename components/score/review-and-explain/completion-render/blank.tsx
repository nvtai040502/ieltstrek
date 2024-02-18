import { useEffect, useState } from 'react';
import { getQuestion } from '@/actions/test-exam/question';
import { Question } from '@prisma/client';
import { InputGap } from '@/components/ui/input';

function BlankRender({
  questionNumber,
  assessmentId
}: {
  assessmentId: string;
  questionNumber: number;
}) {
  const [question, setQuestion] = useState<Question | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedQuestion = await getQuestion({
          assessmentId,
          questionNumber
        });
        setQuestion(fetchedQuestion);
      } catch (error) {
        console.error('Error fetching question:', error);
      }
    };

    fetchData();
  }, [questionNumber, assessmentId]);
  return (
    <InputGap
      value={question?.respond || ''}
      className="inline-block"
      readOnly
    />
  );
}

export default BlankRender;
