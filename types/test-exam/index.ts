import {
  Assessment,
  Blank,
  Choice,
  Completion,
  Matching,
  MatchingChoice,
  MatchingChoiceGroup,
  MultipleChoiceMoreAnswers,
  MultipleChoiceOneAnswer,
  Part,
  Passage,
  Question,
  QuestionGroup,
} from '@prisma/client'

export type AssessmentExtended = Assessment & {
  parts: PartExtended[]
  questions: Question[]
}
export type PassageExtended = Passage & {
  // passageMultiHeadingArray: PassageMultiHeadingExtended[]
}

export type PartExtended = Part & {
  passage: PassageExtended | null
  questionGroups: QuestionGroupExtended[]
  questions: Question[]
}

export type QuestionGroupExtended = QuestionGroup & {
  questions: Question[]

  multiOneList: MultiOneExtended[]
  multiMoreList: MultiMoreExtended[]
  completion?: CompletionExtended | null
  matching?: MatchingExtended | null
  matchingChoiceGroup?: MatchingChoiceGroupExtended | null

  // identifyingInformation?: IdentifyingInformationExtended | null
  // matchingHeading?: MatchingHeadingExtended | null
}
export type MultiOneExtended = MultipleChoiceOneAnswer & {
  choices: Choice[]
  question: Question
}
export type MultiMoreExtended = MultipleChoiceMoreAnswers & {
  choices: Choice[]
  question: Question
}

export type CompletionExtended = Completion & {
  blanks: BlankExtended[]
}
export type BlankExtended = Blank & {
  question: Question
}
export type MatchingExtended = Matching & {
  matchingChoiceGroup: MatchingChoiceGroupExtended
}
export type MatchingChoiceGroupExtended = MatchingChoiceGroup & {
  matchingChoiceList: MatchingChoiceExtended[]
}
export type MatchingChoiceExtended = MatchingChoice & {
  question?: Question | null
}
