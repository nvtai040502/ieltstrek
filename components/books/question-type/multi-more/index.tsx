"use client";
import { Button } from "@/components/ui/button";
import { MultiMoreExtended, MultiOneExtended } from "@/types/db";
import { MultiMoreRender } from "./render";

interface MultiMoreArrayRenderProps {
  multiMoreArray: MultiMoreExtended[];
}
export const MultiMoreArrayRender = ({
  multiMoreArray,
}: MultiMoreArrayRenderProps) => {
  return (
    <>
      {multiMoreArray.map((multiMore) => {
        return <MultiMoreRender multiMore={multiMore} key={multiMore.id} />;
      })}
    </>
  );
};
