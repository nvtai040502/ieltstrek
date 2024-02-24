import { CHOICE_OPTIONS } from '@/config/constants';
import { db } from '@/lib/db';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export const MultiOneListRender = async ({
  questionGroupId
}: {
  questionGroupId: string;
}) => {
  const multiOneList = await db.multipleChoiceOneAnswer.findMany({
    where: { questionGroupId },
    orderBy: { question: { questionNumber: 'asc' } },
    include: { question: true, choices: { orderBy: { order: 'asc' } } }
  });
  return (
    <>
      {multiOneList.map((multiOne) => {
        const question = multiOne.question;
        return (
          <div className="space-y-2" key={multiOne.id}>
            <span
              className={cn(
                'px-2 py-1',
                question.correctAnswer === question.respond
                  ? 'bg-success'
                  : ' bg-destructive'
              )}
            >
              {multiOne.question.questionNumber}
            </span>
            <span>{multiOne.title}</span>

            <RadioGroup disabled>
              {multiOne.choices.map((choice) => {
                return (
                  <div
                    className={cn(
                      'flex  items-center space-x-2 px-4 w-full',
                      choice.isCorrect
                        ? 'bg-success'
                        : CHOICE_OPTIONS[choice.order] === question.respond
                          ? ' bg-destructive'
                          : ''
                    )}
                    key={choice.id}
                  >
                    <RadioGroupItem value={choice.id} id={choice.id} />
                    <Label
                      htmlFor={choice.id}
                      className="py-4 w-full cursor-pointer"
                    >
                      {choice.content}
                    </Label>
                  </div>
                );
              })}
            </RadioGroup>
          </div>
        );
      })}
    </>
  );
};
