"use client"
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { undefined, z } from "zod";
import { TestSchema } from "@/lib/validations/books";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { createTest } from "@/actions/books/test";
import { CardWrapper } from "../auth/card-wrapper";
export function CreateBookForm () {
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof TestSchema>>({
    resolver: zodResolver(TestSchema),
    defaultValues: {
      bookImageCover: "",
      bookName: "",
      testNumber: 1,
    },
  });
  const router= useRouter()
  const onSubmit = (values: z.infer<typeof TestSchema>) => {
    startTransition(async () => {
      const test = await createTest({
        bookImageCover: values.bookImageCover,
        bookName: values.bookName,
        testNumber: values.testNumber
      });

      if (test) {
        toast("Test created successfully");
        form.reset()
        router.push(`/tests/${test.id}`)
      } else {
        toast("Failed to create Test");
      }
    })

    
  };
  return (
    <CardWrapper
      headerLabel="Create book"
    >
    <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="bookName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Version</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Cambridge Academy 16"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
                control={form.control}
                name="testNumber"
                render={({ field }) => (
                  <FormItem>
                  <FormLabel>Version</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="1"
                      type="number"
                    />
                  </FormControl>
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
      </CardWrapper>
  )
}