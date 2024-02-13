import { notFound } from 'next/navigation';
import { TestExamContentRender } from '@/components/test-exam/content-render';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { db } from '@/lib/db';
import { AssessmentExtended } from '@/types/test-exam';
import { AlignJustify, Bell, Wifi } from 'lucide-react';

interface AssessmentIdPageProps {
  params: {
    assessmentId: string;
  };
}
const AssessmentIdPage = async ({ params }: AssessmentIdPageProps) => {
  const assessment: AssessmentExtended | null = await db.assessment.findUnique({
    where: {
      id: params.assessmentId
    },
    include: {
      parts: {
        orderBy: {
          order: 'asc'
        },
        include: {
          questionGroups: {
            orderBy: {
              startQuestionNumber: 'asc'
            },
            include: {
              matching: {
                include: {
                  matchingChoiceGroup: {
                    include: {
                      matchingChoiceList: {
                        orderBy: {
                          question: {
                            questionNumber: 'asc'
                          }
                        },
                        include: {
                          question: true
                        }
                      }
                    }
                  }
                }
              },
              completion: {
                include: {
                  blanks: {
                    orderBy: {
                      question: {
                        questionNumber: 'asc'
                      }
                    },
                    include: {
                      question: true
                    }
                  }
                }
              },
              multiMoreList: {
                include: {
                  choices: true,
                  question: true
                },
                orderBy: {
                  question: {
                    questionNumber: 'asc'
                  }
                }
              },
              multiOneList: {
                include: {
                  choices: true,
                  question: true
                },
                orderBy: {
                  question: {
                    questionNumber: 'asc'
                  }
                }
              }
            }
          },
          passage: true,
          questions: {
            orderBy: {
              questionNumber: 'asc'
            }
          }
        }
      }
    }
  });
  if (!assessment) {
    return notFound();
  }
  return (
    <div className="max-h-screen h-screen flex flex-col">
      {/* Text Exam Header */}
      <div className="px-4 py-2 flex items-center ">
        <div className="gap-6 flex items-center">
          <Icons.logo className="h-6 w-6" aria-hidden="true" />
          <div className="">
            <p className=" font-bold">Title</p>
            <p>Description</p>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-end m">
          <nav className="flex items-center">
            <div className="p-4">
              <Wifi />
            </div>
            <Button variant="ghost">
              <Bell />
            </Button>
            <Button variant="ghost">
              <AlignJustify />
            </Button>
          </nav>
        </div>
      </div>
      <TestExamContentRender assessment={assessment} />
    </div>
  );
};

export default AssessmentIdPage;
