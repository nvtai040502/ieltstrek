import { notFound } from 'next/navigation';
import { Check, X } from 'lucide-react';
import { db } from '@/lib/db';

const QuestionRenderKey = async ({ questionId }: { questionId: string }) => {
  const question = await db.question.findUnique({
    where: { id: questionId }
  });

  if (!question) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      <div className="w-8 bg-red-500">
        <p>{question.questionNumber}</p>
      </div>
      <div>
        <span className="text-green-400">{question.correctAnswer}: </span>
        <span>{question.respond || 'null'} </span>
        <span>
          {question.respond === question.correctAnswer ? (
            <Check className=" inline-flex items-center text-green-500" />
          ) : (
            <X className="text-destructive inline-flex items-center justify-center" />
          )}
        </span>
      </div>
    </div>
  );
};

export default QuestionRenderKey;
