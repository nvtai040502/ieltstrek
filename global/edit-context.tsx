import { createContext, Dispatch, SetStateAction } from "react";
import {
  IdentifyingInformationItemExtended,
  MultipleChoiceExtended,
  NoteCompletionExtended,
} from "@/types/db";
import { Choice, IdentifyingInformation, MultipleChoice } from "@prisma/client";

export type EditType =
  | "editNoteCompletion"
  | "editNoteCompletionGroupItem"
  | "editIdentifyingInformationItem"
  | "editChoice"
  | "editMultipleChoice"
  | null;

export interface EditData {
  noteCompletion?: NoteCompletionExtended;
  identifyingInformationItem?: IdentifyingInformationItemExtended;
  choice?: Choice;
  multipleChoice?: MultipleChoiceExtended;
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
