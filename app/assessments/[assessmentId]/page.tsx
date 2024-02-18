import { notFound } from 'next/navigation';
import { AssessmentExtended } from '@/types/test-exam';
import { db } from '@/lib/db';
import { ParamsAssessmentPageSchema } from '@/lib/validations/params';
import AssessmentRender from '@/components/test-exam/assessment/render';

interface AssessmentIdPageProps {
  params: {
    assessmentId: string;
  };
  searchParams: {};
}
const AssessmentIdPage = async ({
  params,
  searchParams
}: AssessmentIdPageProps) => {
  const { mode } = ParamsAssessmentPageSchema.parse(searchParams);
  const assessment: AssessmentExtended | null = await db.assessment.findUnique({
    where: {
      id: params.assessmentId
    },
    include: {
      questions: {
        orderBy: {
          questionNumber: 'asc'
        }
      },
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
              identifyInfoList: {
                orderBy: {
                  question: {
                    questionNumber: 'asc'
                  }
                },
                include: {
                  question: true
                }
              },
              questions: {
                orderBy: {
                  questionNumber: 'asc'
                }
              },
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
                  questions: {
                    orderBy: {
                      questionNumber: 'asc'
                    }
                  }
                }
              },
              multiMoreList: {
                include: {
                  choices: {
                    orderBy: {
                      order: 'asc'
                    }
                  },
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
                  choices: {
                    orderBy: {
                      order: 'asc'
                    }
                  },
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
          passage: {
            include: {
              passageHeadingList: {
                orderBy: {
                  order: 'asc'
                }
              }
            }
          },
          questions: {
            orderBy: {
              questionNumber: 'asc'
            }
          }
        }
      }
    }
  });
  if (!assessment || !mode) {
    return notFound();
  }
  // Using client side because it is an exam, and user don't want to wait even 3s for just load data from the server
  return <AssessmentRender assessment={assessment} mode={mode} />;
};

export default AssessmentIdPage;
