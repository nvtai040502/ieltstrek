'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { ChoiceData } from '@/global/edit-context'
import { db } from '@/lib/db'
import { ChoiceSchema } from '@/lib/validations/question-type'

export const updateChoice = async ({
  formData,
  choiceData,
}: {
  formData: z.infer<typeof ChoiceSchema>
  choiceData: ChoiceData
}) => {
  const { type, choice } = choiceData
  const { isCorrect } = formData

  if (type === 'MULTI_ONE') {
    const { multiOneId } = choiceData

    // Retrieve the multiOne data associated with the choice ID
    const multiOne = await db.multipleChoiceOneAnswer.findUnique({
      where: { id: multiOneId },
      select: { question: { select: { assessmentId: true } } },
    })

    if (!multiOne) {
      throw new Error('MultiOne ID not found')
    }

    // Update the choice data in the database
    await db.choice.update({
      where: { id: choice.id },
      data: { ...formData },
    })

    // If the choice is marked as correct, update other choices for the same multiOne to be incorrect
    if (isCorrect) {
      await db.choice.updateMany({
        where: {
          NOT: { id: choice.id },
          multiOneId,
        },
        data: { isCorrect: false },
      })
    }

    // Revalidate the path associated with the assessment after updating the choice
    revalidatePath(`/assessments/${multiOne.question.assessmentId}`)
  } else if (type === 'MULTI_MORE') {
    // Handle the case for MULTI_MORE choices
    // This part of the code is pending implementation
  }
}
