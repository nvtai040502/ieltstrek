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
    <div className="flex flex-wrap gap-2 items-center">
      <div className="w-8 h-8 rounded-full bg-success items-center flex justify-center">
        <p className="text-center  rounded-full">{question.questionNumber}</p>
      </div>
      <div>
        <span className=" text-success">{question.correctAnswer}: </span>
        <span>{question.respond || 'null'} </span>
        <span>
          {question.respond === question.correctAnswer ? (
            <Check className=" inline-flex items-center text-success" />
          ) : (
            <X className="text-destructive inline-flex items-center justify-center" />
          )}
        </span>
      </div>
    </div>
  );
};

export default QuestionRenderKey;
