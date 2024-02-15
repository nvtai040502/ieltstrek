import { notFound } from 'next/navigation';
import { AlignJustify, Bell, Wifi } from 'lucide-react';
import { AssessmentExtended } from '@/types/test-exam';
import { db } from '@/lib/db';
import { TestExamContentRender } from '@/components/test-exam/content-render';
import TextExamHeaderRender from '@/components/test-exam/header-render';
import PublicAssessmentButton from '@/components/test-exam/public-assessment-button';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';

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
  if (!assessment) {
    return notFound();
  }
  return (
    <div className="max-h-screen h-screen flex flex-col">
      <TextExamHeaderRender />
      <TestExamContentRender assessment={assessment} />
      <PublicAssessmentButton />
    </div>
  );
};

export default AssessmentIdPage;
