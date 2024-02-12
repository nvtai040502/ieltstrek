"use client";
import ButtonNavigateQuestions from "@/components/books/button-nav-questions";
import ResizePanelGroup from "@/components/books/resize-panel-group";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { ExamContext } from "@/global/exam-context";
import { useExamHandler } from "@/global/exam-hook";
import { AssessmentExtended } from "@/types/db";
import { Check, Send } from "lucide-react";
import { Fragment, useContext, useEffect } from "react";

export const TestExamContentRender = ({
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
  }, [assessment, setSelectedAssessment]);

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
      {selectedAssessment.parts.map((part, i) => (
        <TabsContent
          key={part.id}
          value={String(part.id)}
          className="overflow-hidden flex flex-col"
        >
          <div className="p-4">
            <div className="px-4 py-2 border-foreground rounded-md border items-center">
              <div className="flex gap-2 justify-between items-center">
                <div>
                  <p className=" font-bold">{part.title} </p>
                  <p> {part.description} </p>
                </div>
                {/* <ActionButton setIsUpdating={() => setIsEdittingPassage(true)} /> */}
              </div>
            </div>
          </div>
          {/* <ButtonNavigateQuestions part={part} partIndex={i} /> */}
          <div className="overflow-y-auto">
            <ResizePanelGroup part={part} />
            {/* <ResizePanelGroupDragAndDrop part={part} /> */}
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
        {/* {assessment.parts.map((part) => (
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
        ))} */}
        <Button variant="secondary" onClick={() => setActiveTab("delivering")}>
          <Check className="h-4 w-4" />
        </Button>
      </TabsList>
    </Tabs>
  );
};
