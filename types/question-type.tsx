import { Blank, MatchingSentence, MatchingSentenceItem } from "@prisma/client";
import { BlankExtended } from "./db";

export type MatchingSentenceExtended = MatchingSentence & {
  matchingSentenceItems: MatchingSentenceItemExtended[];
};
export type MatchingSentenceItemExtended = MatchingSentenceItem & {
  blank?: BlankExtended | null;
};
