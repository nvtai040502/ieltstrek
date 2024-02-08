import { createContext, Dispatch, SetStateAction } from "react";
import {
  IdentifyingInformationItemExtended,
  MultiMoreExtended,
  MultiOneExtended,
  NoteCompletionExtended,
  QuestionGroupExtended,
  SummaryCompletionExtended,
} from "@/types/db";
import {
  Choice,
  IdentifyingInformation,
  MultipleChoice,
  MultipleChoiceMoreAnswers,
} from "@prisma/client";

export type EditType =
  | "editNoteCompletion"
  | "editNoteCompletionGroupItem"
  | "editIdentifyingInformationItem"
  | "editChoice"
  | "editMultipleChoice"
  | "editQuestionGroup"
  | "deleteQuestionGroup"
  | "editSummaryCompletion"
  | "editMultiMore"
  | null;

export interface EditData {
  noteCompletion?: NoteCompletionExtended;
  identifyingInformationItem?: IdentifyingInformationItemExtended;
  choice?: Choice;
  multipleChoice?: MultiOneExtended;
  questionGroup?: QuestionGroupExtended;
  summaryCompletion?: SummaryCompletionExtended;
  multiMore?: MultiMoreExtended;
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
