import { useContext } from 'react';
import { getChoiceById } from '@/actions/question-type/multiple-choice/choice';
import { isChoiceCorrect } from '@/actions/question-type/multiple-choice/multi-one';
import {
  getCorrectAnswerByQuestionId,
  getQuestion,
  updateRespond
} from '@/actions/test-exam/question';
import { createOrUpdateResult } from '@/actions/test-exam/result';
import { number } from 'zod';
import { CHOICE_OPTIONS } from '@/config/constants';
import { AnswerType, ExamContext } from './exam-context';

export const useExamHandler = () => {
  const {
    userAnswers,
    questionRefs,
    setCurrentRef,
    currentRef,
    setActiveTab,
    selectedAssessment,
    setUserAnswers,
    selectedPart,
    timeRemaining,
    setMode,
    setIsSubmit
  } = useContext(ExamContext);

  async function handleSubmit() {
    if (!selectedAssessment) {
      return null;
    }
    console.log('User Answers:', userAnswers);
    setIsSubmit(true);
    let totalCorrectAnswers = 0;

    const promises = userAnswers.map(async (userAnswer) => {
      const question = await getQuestion({
        assessmentId: selectedAssessment.id,
        questionNumber: userAnswer.questionNumber
      });
      let respond;
      switch (userAnswer.type) {
        case 'MULTIPLE_CHOICE_ONE_ANSWER':
          const choice = await getChoiceById(userAnswer.choiceId);
          respond = CHOICE_OPTIONS[choice.order];
          await updateRespond({ questionId: question.id, respond });
          if (choice.isCorrect === true) {
            totalCorrectAnswers++;
          }
          break;

        case 'MULTI_MORE':
          for (const choiceId of userAnswer.choiceIdList) {
            const choiceCorrect = await isChoiceCorrect(choiceId);
            if (choiceCorrect) {
              totalCorrectAnswers++;
            }
          }
          break;

        case 'IDENTIFY_INFO':
        case 'COMPLETION':
          respond = userAnswer.content;
          await updateRespond({ questionId: question.id, respond });
          if (question.correctAnswer === respond) {
            totalCorrectAnswers++;
          }
          break;

        default:
          break;
      }
    });
    await Promise.all(promises);
    const timeSpent = selectedAssessment.duration - timeRemaining;
    const score = 0.25 * totalCorrectAnswers;
    await createOrUpdateResult({
      score,
      timeSpent,
      totalCorrectAnswers,
      assessmentId: selectedAssessment.id
    });
    setMode(null);
    setIsSubmit(false);
    console.log('🚀 ~ handleSubmit ~ score:', score);
  }
  function handleQuestionSelected(questionNumber: number) {
    setCurrentRef(questionNumber - 1);
  }
  function handleAnswerChange(props: AnswerType) {
    const { questionNumber, type } = props;

    // Update or add the answer based on the type
    setUserAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      const existingAnswerIndex = updatedAnswers.findIndex(
        (prev) => prev.questionNumber === questionNumber
      );

      // Create a new answer object based on the type
      const newAnswer = (() => {
        switch (type) {
          case 'MULTIPLE_CHOICE_ONE_ANSWER':
            return { questionNumber, type, choiceId: props.choiceId };
          case 'MULTI_MORE':
            return { questionNumber, type, choiceIdList: props.choiceIdList };
          case 'IDENTIFY_INFO':
            return { questionNumber, type, content: props.content };
          case 'COMPLETION':
            return { questionNumber, type, content: props.content };
          default:
            throw new Error(`Unsupported answer type: ${type}`);
        }
      })();

      if (existingAnswerIndex !== -1) {
        updatedAnswers[existingAnswerIndex] = newAnswer;
      } else {
        updatedAnswers.push(newAnswer);
      }
      return updatedAnswers;
    });
  }
  function handleNextQuestion() {
    if (!selectedAssessment || !selectedPart) return null;

    const lastQuestionNumber =
      selectedPart.questionGroups[selectedPart.questionGroups.length - 1]
        .endQuestionNumber;
    if (currentRef + 1 < lastQuestionNumber) {
      setCurrentRef(currentRef + 1);
      const ref = questionRefs[currentRef + 1].current;
      if (ref) {
        ref.scrollIntoView({ behavior: 'smooth', block: 'center' });
        ref.focus();
      }
    } else {
      const nextPart = selectedAssessment.parts.find(
        (part) => part.order === selectedPart.order + 1
      );
      if (nextPart) {
        setCurrentRef(nextPart.questionGroups[0].startQuestionNumber - 1);
        setActiveTab(nextPart.id);
      } else {
        setActiveTab('delivering');
      }
    }
  }

  function handlePrevQuestion() {
    if (!selectedAssessment || !selectedPart) return null;

    const startQuestionNumber =
      selectedPart.questionGroups[0].startQuestionNumber;
    if (currentRef >= startQuestionNumber) {
      setCurrentRef(currentRef - 1);
      const ref = questionRefs[currentRef - 1].current;
      if (ref) {
        ref.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
        ref.focus();
      }
    } else {
      const prevPart = selectedAssessment.parts.find(
        (part) => part.order === selectedPart.order - 1
      );
      if (prevPart) {
        setActiveTab(prevPart.id);
        // setCurrentRef(
        //   prevPart.questionGroups[prevPart.questionGroups.length - 1]
        //     .endQuestionNumber - 1
        // );
      }
    }
  }

  const isHasNextQuestion = currentRef < questionRefs.length - 1;
  const isHasPrevQuestion = currentRef > 0;
  return {
    handleAnswerChange,
    handleSubmit,
    handleNextQuestion,
    handlePrevQuestion,
    handleQuestionSelected,
    isHasNextQuestion,
    isHasPrevQuestion
  };
};
