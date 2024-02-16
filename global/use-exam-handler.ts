import { useContext } from 'react';
import { isChoiceCorrect } from '@/actions/question-type/multiple-choice/multi-one';
import { getCorrectAnswerByQuestionId } from '@/actions/test-exam/question';
import { createOrUpdateResult } from '@/actions/test-exam/result';
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
    setIsSubmit
  } = useContext(ExamContext);

  async function handleSubmit() {
    if (!selectedAssessment) {
      return null;
    }
    setIsSubmit(true);
    console.log('User Answers:', userAnswers);
    let score = 0;
    const promises = userAnswers.map(async (userAnswer) => {
      if (userAnswer.type === 'MULTIPLE_CHOICE_ONE_ANSWER') {
        const choiceCorrect = await isChoiceCorrect(userAnswer.choiceId);
        if (choiceCorrect) {
          score += 0.25;
        }
      } else if (userAnswer.type === 'MULTI_MORE') {
        await Promise.all(
          userAnswer.choiceIdList.map(async (choiceId) => {
            const choiceCorrect = await isChoiceCorrect(choiceId);
            if (choiceCorrect) {
              score += 0.25;
            }
          })
        );
      } else if (userAnswer.type === 'IDENTIFY_INFO') {
        const correctAnswer = await getCorrectAnswerByQuestionId({
          questionId: userAnswer.questionId,
          questionType: 'IDENTIFYING_INFORMATION'
        });
        if (correctAnswer === userAnswer.content) {
          score += 0.25;
        }
      }
    });
    await Promise.all(promises);
    const timeSpent = selectedAssessment.duration - timeRemaining;
    await createOrUpdateResult({
      score,
      timeSpent,
      totalCorrectAnswers: 2,
      assessmentId: selectedAssessment.id
    });
    setIsSubmit(false);
    console.log('🚀 ~ handleSubmit ~ score:', score);
  }
  function handleAnswerSelected(props: AnswerType) {
    console.log(questionRefs);
    const { questionId, type } = props;

    // Update or add the answer based on the type
    setUserAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      const existingAnswerIndex = updatedAnswers.findIndex(
        (prev) => prev.questionId === questionId
      );

      // Create a new answer object based on the type
      const newAnswer = (() => {
        switch (type) {
          case 'MULTIPLE_CHOICE_ONE_ANSWER':
            return { questionId, type, choiceId: props.choiceId };
          case 'MULTI_MORE':
            return { questionId, type, choiceIdList: props.choiceIdList };
          case 'IDENTIFY_INFO':
            return { questionId, type, content: props.content };
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
    if (currentRef - 1 >= startQuestionNumber) {
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
    handleAnswerSelected,
    handleSubmit,
    handleNextQuestion,
    handlePrevQuestion,
    isHasNextQuestion,
    isHasPrevQuestion
  };
};
