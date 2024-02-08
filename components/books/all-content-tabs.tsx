"use client";
import { ExamContext } from "@/global/exam-context";
import { useExamHandler } from "@/global/exam-hook";
import { cn } from "@/lib/utils";
import { AssessmentExtended } from "@/types/db";
import { Check, Send } from "lucide-react";
import { Fragment, useContext, useEffect } from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Tabs, TabsContent, TabsList } from "../ui/tabs";
import ButtonNavigateQuestions from "./button-nav-questions";
import { PartRender } from "./part/part-render";
import ResizePanelGroup from "./resize-panel-group";

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
    currentQuestionIndex,
  } = useContext(ExamContext);

  useEffect(() => {
    setSelectedAssessment(assessment);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { handleSubmit } = useExamHandler();
  const handleMoveToDiv = (questionIndex: number) => {
    questionRefs[questionIndex].current?.focus();
    setCurrentQuestionIndex(questionIndex);
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
          <ButtonNavigateQuestions part={part} partIndex={i} />
          <div className="overflow-y-auto">
            <ResizePanelGroup part={part} />
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
        {assessment.parts.map((part) => (
          <Fragment key={part.id}>
            {activeTab === String(part.id) ? (
              <div
                key={part.id}
                className="flex items-center justify-center gap-8 w-full"
              >
                <p className="px-1 whitespace-nowrap">{part.title}</p>
                <div className="flex items-center">
                  {part.questions.map((question) => (
                    <div
                      key={question.id}
                      role="button"
                      className="hover:border hover:border-secondary-foreground"
                      onClick={() =>
                        handleMoveToDiv(question.questionNumber - 1)
                      }
                    >
                      <p
                        className={cn(
                          "px-2",
                          currentQuestionIndex === question.questionNumber - 1
                            ? "border border-secondary-foreground"
                            : "",
                        )}
                      >
                        {question.questionNumber}
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
