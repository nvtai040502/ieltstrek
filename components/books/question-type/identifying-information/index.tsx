"use client";
import Link from "next/link";


import { ItemRender } from "./item";
import { IdentifyingInformationExtended } from "@/types/db";

interface IdentifyingInformationRenderProps {
  identifyingInformation?: IdentifyingInformationExtended | null;
  handleQuestionSelectAnswer: (questionId: string, value: string) => void;
}
export const IdentifyingInformationRender = ({
  identifyingInformation,
  handleQuestionSelectAnswer,
}: IdentifyingInformationRenderProps) => {
  if (identifyingInformation === undefined || identifyingInformation === null) {
    return null;
  }
  return (
    <>
      {identifyingInformation.identifyingInformationItems.map(
        (item) => {
          return (
            <ItemRender
              handleQuestionSelectAnswer={handleQuestionSelectAnswer}
              item={item}
              key={item.id}
            />
          );
        }
      )}
    </>
  );
};
