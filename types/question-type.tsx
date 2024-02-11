import {
  Blank,
  ListMatchingChoices,
  MatchingChoice,
  MatchingSentence,
  Question,
  QuestionGroup,
} from "@prisma/client";
import { BlankExtended, QuestionGroupExtended } from "./db";

export type MatchingSentenceExtended = MatchingSentence & {
  listMatchingChoices?: ListMatchingChoicesExtended | null;
  questionGroup: QuestionGroup;
};
export type ListMatchingChoicesExtended = ListMatchingChoices & {
  question?: Question;
  matchingChoices: MatchingChoice[];
};
