import { IdentifyChoice } from '@prisma/client';
import { db } from '@/lib/db';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export const IdentifyInfoListRender = async ({
  questionGroupId
}: {
  questionGroupId: string;
}) => {
  const identifyInfoList = await db.identifyingInformation.findMany({
    where: { questionGroupId },
    include: { question: true }
  });
  return (
    <>
      {identifyInfoList.map((identifyInfo) => {
        const question = identifyInfo.question;
        return (
          <div className="space-y-2" key={identifyInfo.id}>
            <div className="flex items-center gap-2 ">
              <p
                className={cn(
                  'px-2 py-1',
                  question.correctAnswer === question.respond
                    ? 'bg-success'
                    : 'bg-destructive'
                )}
              >
                {question.questionNumber}
              </p>
              <p>{identifyInfo.title}</p>
            </div>

            <RadioGroup disabled>
              {[
                IdentifyChoice.TRUE,
                IdentifyChoice.FALSE,
                IdentifyChoice.NOT_GIVEN
              ].map((answer) => (
                <div
                  key={answer}
                  className={cn(
                    'flex items-center space-x-2 px-4 w-full',
                    answer === identifyInfo.choiceCorrect
                      ? 'bg-success'
                      : answer === question.respond
                        ? 'bg-destructive'
                        : ''
                  )}
                >
                  <RadioGroupItem value={answer} />
                  <Label className="py-4 w-full">{answer}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );
      })}
    </>
  );
};
