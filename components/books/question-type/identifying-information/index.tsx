"use client";
import Link from "next/link";


import { ItemRender } from "./item";
import { IdentifyingInformationExtended } from "@/types/db";

interface IdentifyingInformationRenderProps {
  identifyingInformation?: IdentifyingInformationExtended | null;
  
}
export const IdentifyingInformationRender = ({
  identifyingInformation,
  
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
              
              item={item}
              key={item.id}
            />
          );
        }
      )}
    </>
  );
};
