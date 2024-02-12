"use client";
import { ItemRender } from "./item";
import { IdentifyingInformationExtended } from "@/types/db";

interface IdentifyingInformationRenderProps {
  identifyingInformation?: IdentifyingInformationExtended | null;
  
}
export const IdentifyingInformationRender = ({
  identifyingInformation,
  
}: IdentifyingInformationRenderProps) => {
  if (!identifyingInformation) {
    return null;
  }
  return (
    <>
      {identifyingInformation.identifyingInformationItems.map(
        (item) => {
          return (
            <ItemRender
              item={item}
              key={item.id}
            />
          );
        }
      )}
    </>
  );
};
