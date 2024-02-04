import { useContext } from "react";
import { ExamContext } from "./exam-context";
import { EditContext, EditData, EditType } from "./edit-context";

export const useEditHook = () => {
  const { setIsOpen, setData, setType } =
    useContext(EditContext);

  function onOpen({ type, data }: { type: EditType; data?: EditData }) {
    setData(data);
    setType(type);
    setIsOpen(true);
  }
  function onClose() {
    setIsOpen(false);
    setType(null);
    setData(undefined);
  }
  return {
    onClose,
    onOpen
  };
};
