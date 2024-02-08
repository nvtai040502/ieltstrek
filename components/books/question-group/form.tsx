"use client";
import { Button } from "../../ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { QuestionGroup, QuestionType } from "@prisma/client";
import { QuestionGroupSchema } from "@/lib/validations/books";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AutosizeTextarea } from "@/components/ui/autosize-text-area";
import { UseFormReturn } from "react-hook-form";
import { useState } from "react";

export function QuestionGroupForm({
  isPending,
  form,
  onSubmit,
}: {
  isPending: boolean;
  form: UseFormReturn<z.infer<typeof QuestionGroupSchema>>;
  onSubmit: (values: z.infer<typeof QuestionGroupSchema>) => void;
}) {
  const [selectedType, setSelectedType] = useState<QuestionType>(
    form.getValues().type,
  );

  const handleTypeChange = (value: QuestionType) => {
    setSelectedType(value);
  };
  return <div className="px-4"></div>;
}
