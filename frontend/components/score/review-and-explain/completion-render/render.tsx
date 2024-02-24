import { db } from '@/lib/db';
import ParagraphRender from './paragraph';

export const CompletionRender = async ({
  questionGroupId
}: {
  questionGroupId: string;
}) => {
  const completion = await db.completion.findUnique({
    where: { questionGroupId },
    include: { questions: { orderBy: { questionNumber: 'asc' } } }
  });
  if (!completion) {
    console.log('completion not found');
    return null;
  }
  return <ParagraphRender completion={completion} />;
};
