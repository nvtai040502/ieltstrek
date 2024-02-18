import { QuestionType } from '@prisma/client';

export const MODE = {
  edit: 'edit',
  exam: 'exam'
};

export const CHOICE_OPTIONS = ['A', 'B', 'C', 'D'];

type QuestionTypeStrings = {
  [K in keyof typeof QuestionType]: K;
};
export const QUESTION_TYPE_VALUE: QuestionTypeStrings = {
  COMPLETION: 'COMPLETION',
  IDENTIFYING_INFORMATION: 'IDENTIFYING_INFORMATION',
  MATCHING: 'MATCHING',
  TABLE_COMPLETION: 'TABLE_COMPLETION',
  MATCHING_HEADING: 'MATCHING_HEADING',
  MULTIPLE_CHOICE_ONE_ANSWER: 'MULTIPLE_CHOICE_ONE_ANSWER',
  MULTIPLE_CHOICE_MORE_ANSWERS: 'MULTIPLE_CHOICE_MORE_ANSWERS'
};
