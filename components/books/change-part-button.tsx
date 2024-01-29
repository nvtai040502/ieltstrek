"use client";

import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LoginForm } from "@/components/auth/login-form";
import { CreateAssessmentForm } from "./create-assessment-form";
import { EditPartForm } from "./part/update-form";
import { Part } from "@prisma/client";

interface ChangePartButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect",
  asChild?: boolean;
  part: Part;
};

export const ChangePartButton = ({
  children,
  mode = "modal",
  part,
  asChild
}: ChangePartButtonProps) => {
  const router = useRouter();

  const onClick = () => {
    // router.push("/books/create-book");
  };

  if (mode === "modal") {
    return (
      <Dialog>
        <DialogTrigger asChild={asChild}>
          {children}
        </DialogTrigger>
        <DialogContent className="p-0 w-auto bg-transparent border-none">
          <EditPartForm part={part}/>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};