"use client"
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { z } from "zod";
import { CambridgeBookSchema, TestSchema } from "@/lib/validations/cambridge-book";
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
import { CambridgeBook, SessionType } from "@prisma/client";
export function CreateTest ({cambridgeBooks}: {cambridgeBooks: CambridgeBook[]}) {
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof TestSchema>>({
    resolver: zodResolver(TestSchema),
    defaultValues: {
      number: undefined,
      cambridgeBookId: "",
      sessionType:""
    },
  });
  const router= useRouter()
  const onSubmit = (values: z.infer<typeof TestSchema>) => {
    startTransition(async () => {
      const success = await createTest(values.number, values.sessionType as any, values.cambridgeBookId);

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
              name="number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Version</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="20"
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
                control={form.control}
                name="sessionType"
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
                        <SelectItem value={SessionType.READING}>
                          Reading
                        </SelectItem>
                        <SelectItem value={SessionType.LISTENING}>
                          Listening
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cambridgeBookId"
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
                        {cambridgeBooks.map((cambridgeBook) => (
                        <SelectItem value={cambridgeBook.id} key={cambridgeBook.id}>
                          {cambridgeBook.version}
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