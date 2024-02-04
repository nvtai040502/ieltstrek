import { createContext, Dispatch, SetStateAction } from "react";
import {
  NoteCompletionExtended,
  NoteCompletionGroupItemExtended,
} from "@/types/db";

export type EditType =
  | "editNoteCompletion"
  | "editNoteCompletionGroupItem"
  | null;

export interface EditData {
  noteCompletion?: NoteCompletionExtended;
  noteCompletionGroupItem?: NoteCompletionGroupItemExtended;
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
