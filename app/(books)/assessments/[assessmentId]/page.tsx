import { AssessmentSiteHeader } from "@/components/books/assessment-side-header";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { AssessmentExtended } from "@/types/db";
import { TabRender } from "@/components/books/tab-render";

interface AssessmentIdPageProps {
  params: {
    assessmentId: string;
  };
}
const AssessmentIdPage = async ({ params }: AssessmentIdPageProps) => {
  const assessment: AssessmentExtended | null = await db.assessment.findUnique({
    where: {
      id: Number(params.assessmentId),
    },
    include: {
      questions: {
        orderBy: { questionNumber: "asc" },
      },
      parts: {
        orderBy: { id: "asc" }, // Order parts by id
        include: {
          passage: {
            include: {
              passageMultiHeadingArray: {
                orderBy: { id: "asc" },
                include: {
                  question: true,
                },
              },
            },
          },
          questions: {
            orderBy: {
              questionNumber: "asc",
            },
          },
          questionGroups: {
            orderBy: { startQuestionNumber: "asc" },
            include: {
              matchingHeading: {
                include: {
                  passageHeadingArray: {
                    orderBy: { id: "asc" },
                  },
                  matchingHeadingItemArray: {
                    orderBy: { id: "asc" },
                  },
                },
              },
              multiMoreArray: {
                include: {
                  choices: {
                    orderBy: { id: "asc" }, // Order choices by id
                  },
                  question: true,
                },
                orderBy: {
                  question: { questionNumber: "asc" },
                },
              },
              multipleChoiceArray: {
                include: {
                  choices: {
                    orderBy: { id: "asc" }, // Order choices by id
                  },
                  question: true,
                },
                orderBy: {
                  question: { questionNumber: "asc" },
                },
              },
              noteCompletion: {
                include: {
                  questionGroup: true,
                  blanks: {
                    orderBy: {
                      question: { questionNumber: "asc" },
                    },
                    include: {
                      question: true,
                    },
                  },
                },
              },
              identifyingInformation: {
                include: {
                  identifyingInformationItems: {
                    include: {
                      question: true,
                    },
                    orderBy: {
                      question: { questionNumber: "asc" },
                    },
                  },
                },
              },
              summaryCompletion: {
                include: {
                  summaryCompletionItems: {
                    include: {
                      question: true,
                    },
                    orderBy: { question: { questionNumber: "asc" } },
                  },
                },
              },
            },
          },
        },
      },
    },
  });
  if (!assessment) {
    return notFound();
  }
  // console.log(assessment.parts[0].questionGroups[0])
  return (
    <div className="max-h-screen h-screen flex flex-col">
      <AssessmentSiteHeader />
      <TabRender assessment={assessment} />
    </div>
  );
};

export default AssessmentIdPage;
