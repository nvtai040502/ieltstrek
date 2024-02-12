"use client";
import { Button } from "@/components/ui/button";
import { MultiOneExtended } from "@/types/db";
import { MultiOneRender } from "./render";

interface MultiOneArrayRenderProps {
  multiOneArray: MultiOneExtended[];
}
export const MultiOneArrayRender = ({
  multiOneArray,
}: MultiOneArrayRenderProps) => {
  return (
    <>
      {multiOneArray.map((multiOne) => {
        return <MultiOneRender multiOne={multiOne} key={multiOne.id} />;
      })}
    </>
  );
};
