"use client";

import { NoteCompletionExtended } from "@/types/db";
import { UpdateButton } from "../../update-button";
import { useEditHook } from "@/global/use-edit-hook";
import { Preview } from "@/components/text-editor/preview";
import ReactQuill from "react-quill";
import RichTextExample from "@/components/text-editor/rich-text";

interface NoteCompletionRenderProps {
  noteCompletion?: NoteCompletionExtended | null;
}
export const NoteCompletionRender = ({
  noteCompletion,
}: NoteCompletionRenderProps) => {
  const { onOpen } = useEditHook();
  if (!noteCompletion) {
    return null;
  }
  return (
    <>
      <RichTextExample />
    </>
  );
};
