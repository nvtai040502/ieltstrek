import { createContext, Dispatch, SetStateAction } from "react";
import {
  IdentifyingInformationItemExtended,
  MultiMoreExtended,
  MultiOneExtended,
  NoteCompletionExtended,
  PartExtended,
  QuestionGroupExtended,
  SummaryCompletionExtended,
} from "@/types/db";
import {
  Choice,
  IdentifyingInformation,
  MultipleChoice,
  MultipleChoiceMoreAnswers,
  Passage,
  PassageMultiHeading,
} from "@prisma/client";

export type EditType =
  | "editNoteCompletion"
  | "editNoteCompletionGroupItem"
  | "editIdentifyingInformationItem"
  | "editChoice"
  | "editMultiOne"
  | "editSummaryCompletion"
  | "editMultiMore"
  // Passage
  | "editPassage"
  | "createPassage"
  | "editPassageMultiHeading"
  // Question Group
  | "editQuestionGroup"
  | "deleteQuestionGroup"
  | "createQuestionGroup"
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
