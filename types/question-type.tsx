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
};
export type ListMatchingChoicesExtended = ListMatchingChoices & {
  matchingChoices: MatchingChoiceExtended[];
};
export type MatchingChoiceExtended = MatchingChoice & {
  question?: Question | null;
};
