'use client';

import { useContext, useEffect } from 'react';
import { ExamContext } from '@/global/exam-context';
import { AssessmentExtended } from '@/types/test-exam';
import { ModeType } from '@/lib/validations/params';
import { TestExamContentRender } from '../content-render';
import TextExamHeaderRender from '../header-render';

const AssessmentRender = ({
  assessment,
  mode
}: {
  assessment: AssessmentExtended;
  mode: ModeType;
}) => {
  const { setSelectedAssessment, setMode } = useContext(ExamContext);

  useEffect(() => {
    setSelectedAssessment(assessment);
    setMode(mode);
  }, [assessment, setSelectedAssessment, mode, setMode]);

  return (
    <div className="max-h-screen h-screen flex flex-col">
      <TextExamHeaderRender />
      <TestExamContentRender />
    </div>
  );
};

export default AssessmentRender;
