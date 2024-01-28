"use client";

import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LoginForm } from "@/components/auth/login-form";
import { CreateAssessmentForm } from "./create-assessment-form";

interface CreateAssessmentButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect",
  asChild?: boolean;
};

export const CreateAssessmentButton = ({
  children,
  mode = "redirect",
  asChild
}: CreateAssessmentButtonProps) => {
  const router = useRouter();

  const onClick = () => {
    router.push("/books/create-book");
  };

  if (mode === "modal") {
    return (
      <Dialog>
        <DialogTrigger asChild={asChild}>
          {children}
        </DialogTrigger>
        <DialogContent className="p-0 w-auto bg-transparent border-none">
          <CreateAssessmentForm />
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