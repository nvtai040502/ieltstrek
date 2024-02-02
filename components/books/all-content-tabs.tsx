"use client";
import { AssessmentExtended } from "@/types/db";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { PartRender } from "./part/part-render";
import ResizePannelGroup from "./resize-pannel-group";
import { Check, Send } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const AllContentTabs = ({
  assessment,
}: {
  assessment: AssessmentExtended;
}) => {
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: string }>({});
  const [activeTab, setActiveTab] = useState<string>(
    String(assessment.parts[0].id)
  );
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
    <Tabs value={activeTab} className="overflow-hidden  flex-1 flex flex-col">
      {assessment.parts.map((part, i) => (
        <TabsContent
          key={part.id}
          value={String(part.id)}
          className="overflow-hidden flex flex-col"
        >
          <PartRender part={part} />
          <div className="overflow-y-auto">
            <ResizePannelGroup
              part={part}
              setNextTab={() =>
                i < assessment.parts.length - 1
                  ? setActiveTab(String(assessment.parts[i + 1].id))
                  : setActiveTab("delivering")
              }
              setPrevTab={() =>
                setActiveTab(String(assessment.parts[i - 1].id))
              }
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
        <Separator className="hidden xl:block mt-20 " />
      </TabsContent>
      <TabsList className="flex justify-between items-center h-40">
        {assessment.parts.map((part) =>
          activeTab === String(part.id) ? (
            <Button
              key={part.id}
              className="w-full rounded-none border-none hover:bg-background"
              variant="outline"
            >
              <p>{part.title}</p>
              
            </Button>
          ) : (
            <Button
              key={part.id}
              className="w-full rounded-none border-none"
              variant="outline"
            >
              {part.title}
            </Button>
          )
        )}
        <Button variant="secondary" onClick={() => setActiveTab("delivering")}>
          <Check className="h-4 w-4" />
        </Button>
      </TabsList>
    </Tabs>
  );
};
