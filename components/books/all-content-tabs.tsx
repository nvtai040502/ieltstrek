"use client";
import { AssessmentExtended, PartExtended } from "@/types/db";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { PartRender } from "./part/part-render";
import ResizePannelGroup from "./resize-pannel-group";
import { ArrowLeft, ArrowRight, Check, Send } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import React, { Fragment, useEffect, useState } from "react";
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
  const divRefs = Array.from({ length: 40 }, () =>
    React.createRef<HTMLDivElement>()
  );

  const [currentDivIndex, setCurrentDivIndex] = useState<number>(0);
  const hasPrevDiv = (index: number) => {
    return index > 0;
  };
  const handleMoveToDiv = (index: number) => {
    divRefs[index].current?.focus();
    setCurrentDivIndex(index);
  };
  const hasNextDiv = (index: number) => {
    return index < divRefs.length - 1;
  };
  const handleNextDiv = (part: PartExtended, i: number) => {
    if (
      currentDivIndex + 2 <=
      part.questionGroups[part.questionGroups.length - 1].endQuestionNumber
    ) {
      setCurrentDivIndex((prevIndex) => {
        divRefs[prevIndex + 1].current?.focus();
        return prevIndex + 1;
      });
    } else {
      if (i < assessment.parts.length - 1) {
        setCurrentDivIndex(
          assessment.parts[i + 1].questionGroups[0].startQuestionNumber - 1
        );
        setActiveTab(String(assessment.parts[i + 1].id));
      } else {
        setActiveTab("delivering");
      }
    }
  };

  const handlePrevDiv = (part: PartExtended, i: number) => {
    if (currentDivIndex >= part.questionGroups[0].startQuestionNumber) {
      setCurrentDivIndex((prevIndex) => {
        divRefs[prevIndex - 1].current?.focus();
        return prevIndex - 1;
      });
    } else {
      setActiveTab(String(assessment.parts[i - 1].id));
      setCurrentDivIndex(
        assessment.parts[i - 1].questionGroups[0].startQuestionNumber - 1
      );
    }
  };
  return (
    <>
      <Tabs value={activeTab} className="overflow-hidden  flex-1 flex flex-col">
        {assessment.parts.map((part, i) => (
          <TabsContent
            key={part.id}
            value={String(part.id)}
            className="overflow-hidden flex flex-col"
          >
            <PartRender part={part} />
            <div className="absolute inset-0 h-20">
              <Button
                onClick={() => handlePrevDiv(part, i)}
                disabled={!hasPrevDiv(currentDivIndex)}
                size="xl"
              >
                <ArrowLeft />
              </Button>
              <Button
                onClick={() => handleNextDiv(part, i)}
                disabled={!hasNextDiv(currentDivIndex)}
                size="xl"
              >
                <ArrowRight />
              </Button>
            </div>
            <div className="overflow-y-auto">
              <ResizePannelGroup
                part={part}
                handleQuestionSelectAnswer={handleQuestionSelectAnswer}
                divRefs={divRefs}
                currentDivIndex={currentDivIndex}
                setCurrentDivIndex={setCurrentDivIndex}
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
          {assessment.parts.map((part, i) => (
            <Fragment key={part.id}>
              {activeTab === String(part.id) ? (
                <div
                  key={part.id}
                  className="flex items-center justify-center gap-8 w-full"
                >
                  <p className="px-1 whitespace-nowrap">{part.title}</p>
                  <div className="flex items-center">
                    {part.multipleChoiceArray.map((part) => (
                      <div
                        key={part.id}
                        role="button"
                        className="hover:border hover:border-secondary-foreground"
                        onClick={() => handleMoveToDiv(part.questionNumber-1)}
                      >
                        <p
                          className={cn(
                            "p-2",
                            currentDivIndex === part.questionNumber-1
                              ? "border border-secondary-foreground"
                              : ""
                          )}
                        >
                          {part.questionNumber}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <Button
                  className="w-full rounded-none border-none"
                  variant="outline"
                  onClick={() => setActiveTab(String(part.id))}
                >
                  {part.title}
                </Button>
              )}
            </Fragment>
          ))}
          <Button
            variant="secondary"
            onClick={() => setActiveTab("delivering")}
          >
            <Check className="h-4 w-4" />
          </Button>
        </TabsList>
      </Tabs>
    </>
  );
};
