"use client";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Send } from "lucide-react";
import { AssessmentExtended, PartExtended } from "@/types/db";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Tabs, TabsContent, TabsList } from "../ui/tabs";
import { cn } from "@/lib/utils";
import ResizePannelGroup from "./resize-pannel-group";
import { PartRender } from "./part/part-render";
import { ExamContext } from "@/global/exam-context";

export const AllContentTabs = ({
  assessment,
}: {
  assessment: AssessmentExtended;
}) => {
  const {
    selectedAssessment,
    setSelectedAssessment,
    activeTab,
    setActiveTab,
    questionRefs,
    setCurrentQuestionIndex,
    currentQuestionIndex
  } = useContext(ExamContext);

  useEffect(() => {
    setSelectedAssessment(assessment);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [userAnswers, setUserAnswers] = useState<{ [key: string]: string }>({});

  const handleQuestionSelectAnswer = (questionId: string, value: string) => {
    setUserAnswers((prevAnswers) => ({ ...prevAnswers, [questionId]: value }));
  };

  const handleSubmit = () => {
    console.log("User Answers:", userAnswers);
  };

  const hasPrevDiv = (index: number) => index > 0;
  const handleMoveToDiv = (index: number) => {
    questionRefs[index].current?.focus();
    setCurrentQuestionIndex(index);
  };

  const hasNextDiv = (index: number) => index < questionRefs.length - 1;
  const handleNextDiv = (part: PartExtended, i: number) => {
    if (
      currentQuestionIndex + 2 <=
      part.questionGroups[part.questionGroups.length - 1].endQuestionNumber
    ) {
      setCurrentQuestionIndex((prevIndex) => {
        questionRefs[prevIndex + 1].current?.focus();
        return prevIndex + 1;
      });
    } else {
      if (i < assessment.parts.length - 1) {
        setCurrentQuestionIndex(
          assessment.parts[i + 1].questionGroups[0].startQuestionNumber - 1
        );
        setActiveTab(String(assessment.parts[i + 1].id));
      } else {
        setActiveTab("delivering");
      }
    }
  };

  const handlePrevDiv = (part: PartExtended, i: number) => {
    if (currentQuestionIndex >= part.questionGroups[0].startQuestionNumber) {
      setCurrentQuestionIndex((prevIndex) => {
        questionRefs[prevIndex - 1].current?.focus();
        return prevIndex - 1;
      });
    } else {
      setActiveTab(String(assessment.parts[i - 1].id));
      setCurrentQuestionIndex(
        assessment.parts[i - 1].questionGroups[0].startQuestionNumber - 1
      );
    }
  };
  if (!selectedAssessment) {
    return null;
  }
  return (
    <Tabs value={activeTab} className="overflow-hidden flex-1 flex flex-col">
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
              disabled={!hasPrevDiv(currentQuestionIndex)}
              size="xl"
            >
              <ArrowLeft />
            </Button>
            <Button
              onClick={() => handleNextDiv(part, i)}
              disabled={!hasNextDiv(currentQuestionIndex)}
              size="xl"
            >
              <ArrowRight />
            </Button>
          </div>
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
        <Separator className="hidden xl:block mt-20" />
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
                  {part.questions.map((part) => (
                    <div
                      key={part.id}
                      role="button"
                      className="hover:border hover:border-secondary-foreground"
                      onClick={() => handleMoveToDiv(part.questionNumber - 1)}
                    >
                      <p
                        className={cn(
                          "px-2",
                          currentQuestionIndex === part.questionNumber - 1
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
        <Button variant="secondary" onClick={() => setActiveTab("delivering")}>
          <Check className="h-4 w-4" />
        </Button>
      </TabsList>
    </Tabs>
  );
};
