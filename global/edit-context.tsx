import { createContext, Dispatch, SetStateAction } from "react";
import {
  IdentifyingInformationItemExtended,
  NoteCompletionExtended,
  NoteCompletionGroupItemExtended,
} from "@/types/db";
import { IdentifyingInformation } from "@prisma/client";

export type EditType =
  | "editNoteCompletion"
  | "editNoteCompletionGroupItem"
  | "editIdentifyingInformationItem"
  | null;

export interface EditData {
  noteCompletion?: NoteCompletionExtended;
  noteCompletionGroupItem?: NoteCompletionGroupItemExtended;
  identifyingInformationItem?: IdentifyingInformationItemExtended
}

interface EditContextProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  data: EditData | undefined;
  setData: Dispatch<SetStateAction<EditData | undefined>>;
  type: EditType;
  setType: Dispatch<SetStateAction<EditType>>;
}

export const EditContext = createContext<EditContextProps>({
  isOpen: false,
  setIsOpen: () => {},
  data: undefined,
  setData: () => {},
  type: null,
  setType: () => {},
});
