"use client";
import { AssessmentExtended } from "@/types/db";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { PartRender } from "./part/part-render";
import ResizePannelGroup from "./resize-pannel-group";
import { Check, Send } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useState } from "react";

export const AllContentTabs = ({
  assessment,
}: {
  assessment: AssessmentExtended;
}) => {
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: string }>({});
  const handleQuestionSelectAnswer = (questionId: string, value: string) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };
  const handleSubmit = () => {
    console.log("User Answers:", userAnswers);
  };
  return (
    <Tabs
      defaultValue={String(assessment.parts[0].id)}
      className="overflow-hidden  flex-1 flex flex-col"
    >
      {assessment.parts.map((part) => (
        <TabsContent
          key={part.id}
          value={String(part.id)}
          className="overflow-hidden flex flex-col"
        >
          <PartRender part={part} />
          <div className="overflow-y-auto">
            <ResizePannelGroup
              part={part}
              handleQuestionSelectAnswer={handleQuestionSelectAnswer}
            />
          </div>
        </TabsContent>
      ))}
      <TabsContent value="delivering" className="h-full">
        <div className="flex items-center justify-center w-full">
          <div className="flex justify-between items-center w-full max-w-3xl">
            <p>Click next to continue</p>
            <Button size="lg" onClick={handleSubmit}>
              <Send className="mr-2 h-4 w-4" />
              Next
            </Button>
          </div>
        </div>
        <Separator className="mt-20 hidden xl:block" />
      </TabsContent>
      <TabsList className="flex justify-between items-center h-40">
        {assessment.parts.map((part, i) => (
          <TabsTrigger key={part.id} value={String(part.id)} className="w-full">
            {part.title}
          </TabsTrigger>
        ))}
        <TabsTrigger
          asChild
          value="delivering"
          className="data-[state=active]:bg-secondary"
        >
          <Button variant="secondary">
            <Check className="h-4 w-4" />
          </Button>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
