'use client'

import { useContext } from 'react'
import { Draggable, Droppable } from '@hello-pangea/dnd'
import { QuestionType } from '@prisma/client'
import { ExamContext } from '@/global/exam-context'
import { PartExtended } from '@/types/db'
import { cn } from '@/lib/utils'
import { ActionButton } from '../../test-exam/action-button'

export function PassageDragAndDropRender({ part }: { part: PartExtended }) {
  const passage = part.passage
  const {
    questionRefs,
    currentRef: currentQuestionIndex,
    setCurrentRef: setCurrentQuestionIndex,
    setUserAnswers,
    userAnswers,
  } = useContext(ExamContext)

  return (
    <div>
      {passage ? (
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <div>
              <p className=" font-bold"> {passage.title} </p>
              <p className=" italic font-light">{passage.description}</p>
            </div>
            <ActionButton
              actionType="update"
              editType="editPassage"
              data={{ passage }}
            />
          </div>
          {passage.type === 'PASSAGE_SIMPLE' && (
            <p className="whitespace-pre-line"> {passage.content} </p>
          )}

          {passage.type === 'PASSAGE_MULTI_HEADING' &&
            passage.passageMultiHeadingArray.map((item) => (
              <div key={item.id}>
                {item.question ? (
                  <Droppable
                    isCombineEnabled
                    type={QuestionType.MATCHING_HEADING}
                    // ignoreContainerClipping={true}
                    droppableId={String(item.question.questionNumber)}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={
                          questionRefs[item.question!.questionNumber - 1] &&
                          provided.innerRef
                        }
                        className={cn(
                          '',
                          snapshot.isDraggingOver ? 'bg-red-500' : ''
                        )}
                        {...provided.droppableProps}
                      >
                        {!snapshot.isDraggingOver &&
                          (userAnswers[item.question!.questionNumber] ? (
                            <p>{userAnswers[item.question!.questionNumber]}</p>
                          ) : (
                            <p className="border border-secondary-foreground w-full p-4"></p>
                          ))}

                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                ) : (
                  <h2>{item.title}</h2>
                )}

                <p className=" whitespace-pre-line ">{item.content}</p>
              </div>
            ))}
        </div>
      ) : (
        <>
          <ActionButton
            actionType="create"
            editType="createPassage"
            data={{ part }}
          />
        </>
      )}
    </div>
  )
}
