"use client"
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { z } from "zod";
import { CambridgeBookSchema } from "@/lib/validations/books";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { createCambridgeBook } from "@/actions/books/cambridge-book";
import { error } from "console";
import { toast } from "sonner";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
export function CreateBook () {
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof CambridgeBookSchema>>({
    resolver: zodResolver(CambridgeBookSchema),
    defaultValues: {
      version: undefined,
      imageCover: ""
    },
  });
  const router= useRouter()
  const onSubmit = (values: z.infer<typeof CambridgeBookSchema>) => {
    startTransition(async () => {
      const success = await createCambridgeBook(values.version, values.imageCover);

      if (success) {
        toast("Cambridge Book created successfully");
        form.reset()
        router.refresh()
      } else {
        toast("Failed to create Cambridge Book");
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
              name="version"
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
              name="imageCover"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image Cover</FormLabel>
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