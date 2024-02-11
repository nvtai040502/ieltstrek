import {
  IdentifyingInformationItemExtended,
  MatchingHeadingExtended,
  MultiMoreExtended,
  MultiOneExtended,
  NoteCompletionExtended,
  PartExtended,
  QuestionGroupExtended,
  SummaryCompletionExtended,
} from "@/types/db";
import {
  ListMatchingChoicesExtended,
  MatchingSentenceExtended,
} from "@/types/question-type";
import { Choice, Passage, PassageMultiHeading } from "@prisma/client";
import { createContext, Dispatch, SetStateAction } from "react";

export type EditType =
  // Question Type
  | "editNoteCompletion"
  | "editNoteCompletionGroupItem"
  | "editIdentifyingInformationItem"
  | "editChoice"
  | "editMultiOne"
  | "editSummaryCompletion"
  | "editMultiMore"
  | "editMatchingSentence"
  // Passage
  | "editPassage"
  | "createPassage"
  | "editPassageMultiHeading"
  // Question Group
  | "editQuestionGroup"
  | "deleteQuestionGroup"
  | "createQuestionGroup"
  | "editMatchingHeading"
  | "editListMatchingChoices"
  | null;

export interface EditData {
  noteCompletion?: NoteCompletionExtended;
  identifyingInformationItem?: IdentifyingInformationItemExtended;
  choice?: Choice;
  multiOne?: MultiOneExtended;
  questionGroup?: QuestionGroupExtended;
  summaryCompletion?: SummaryCompletionExtended;
  multiMore?: MultiMoreExtended;
  part?: PartExtended;
  passage?: Passage;
  passageMultiHeading?: PassageMultiHeading;
  matchingHeading?: MatchingHeadingExtended;
  matchingSentence?: MatchingSentenceExtended;
  listMatchingChoices?: ListMatchingChoicesExtended;
}

interface EditContextProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  data: EditData | undefined;
  setData: Dispatch<SetStateAction<EditData | undefined>>;
  type: EditType;
  setType: Dispatch<SetStateAction<EditType>>;
  textNoteCompletion: string;
  setTextNoteCompletion: Dispatch<SetStateAction<string>>;
}

export const EditContext = createContext<EditContextProps>({
  isOpen: false,
  textNoteCompletion: "",
  setTextNoteCompletion: () => {},
  setIsOpen: () => {},
  data: undefined,
  setData: () => {},
  type: null,
  setType: () => {},
});
