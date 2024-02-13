'use client';

import { useState } from 'react';
import { Button } from '../../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../../ui/form';
import { Input } from '../../ui/input';
import { AutosizeTextarea } from '@/components/ui/autosize-text-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { QuestionGroupSchema } from '@/lib/validations/text-exam';
import { zodResolver } from '@hookform/resolvers/zod';
import { QuestionGroup, QuestionType } from '@prisma/client';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

export function QuestionGroupForm({
  isPending,
  form,
  onSubmit
}: {
  isPending: boolean;
  form: UseFormReturn<z.infer<typeof QuestionGroupSchema>>;
  onSubmit: (values: z.infer<typeof QuestionGroupSchema>) => void;
}) {
  const [selectedType, setSelectedType] = useState<QuestionType>(
    form.getValues().type
  );

  const handleTypeChange = (value: QuestionType) => {
    setSelectedType(value);
  };
  return <div className="px-4"></div>;
}
