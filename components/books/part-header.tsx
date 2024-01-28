import { Part } from "@prisma/client";
import { ChangePartButton } from "./change-part-button";
import { Button } from "../ui/button";

export function PartHeader({part}: {part: Part}) {
  return (
    <div className="p-4">
      <div className="flex justify-between border-foreground rounded-md border items-center">
      <div className=" px-4 py-2 ">
          <p className=" font-bold">
            {part.title} 
          </p>
          <p>
            {part.description} 
          </p>
      </div>
        <ChangePartButton asChild part={part}>
          <Button>
            Change
          </Button>
        </ChangePartButton>
      </div>
    </div>
  )
}