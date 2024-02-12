"use client";
import { Delete, Edit, Plus, XCircle } from "lucide-react";
import { Button } from "../ui/button";
import { useEditHook } from "@/global/use-edit-hook";
import { EditData, EditType } from "@/global/edit-context";

export const ActionButton = ({
  actionType,
  editType,
  data,
}: {
  actionType: "create" | "update" | "delete" | "close";
  editType: EditType;
  data: EditData;
}) => {
  const { onOpen, onClose } = useEditHook();
  return (
    <Button
      variant="ghost"
      size="xs"
      onClick={() =>
        actionType === "close" ? onClose() : onOpen({ type: editType, data })
      }
    >
      {actionType === "create" && <Plus />}
      {actionType === "update" && <Edit />}
      {actionType === "delete" && <Delete />}
      {actionType === "close" && <XCircle />}
    </Button>
  );
};
