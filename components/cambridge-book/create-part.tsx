"use client"
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { z } from "zod";
import { CambridgeBookSchema, PartSchema, TestSchema } from "@/lib/validations/cambridge-book";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { createCambridgeBook } from "@/actions/books/cambridge-book";
import { error } from "console";
import { toast } from "sonner";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { createTest } from "@/actions/books/test";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { CambridgeBook, SessionType, Test } from "@prisma/client";
import { createPart } from "@/actions/books/part";
export function CreatePart ({tests}: {tests: Test[]}) {
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof PartSchema>>({
    resolver: zodResolver(PartSchema),
    defaultValues: {
      name: "",
      testId: "",
    },
  });
  const router= useRouter()
  const onSubmit = (values: z.infer<typeof PartSchema>) => {
    startTransition(async () => {
      const success = await createPart(values.name, values.testId);

      if (success) {
        toast("Test created successfully");
        form.reset()
        router.refresh()
      } else {
        toast("Failed to create Test");
      }
    })

    
  };
  return (
    <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Version</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="20"
                      // type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
              <FormField
                control={form.control}
                name="testId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Session</FormLabel>
                    <Select
                      disabled={isPending}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a session" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {tests.map((test) => (
                        <SelectItem value={test.id} key={test.id}>
                          {test.number}
                        </SelectItem>

                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
          </div>
          
          <Button
            disabled={isPending}
            type="submit"
            className="w-full"
          >
            Create
          </Button>
        </form>
      </Form>
  )
}