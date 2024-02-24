'use client';

import { useContext } from 'react';
import { ExamContext } from '@/global/exam-context';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

function SubmitModal() {
  const { isSubmit } = useContext(ExamContext);

  if (!isSubmit) {
    return null;
  }
  return (
    <Dialog open={isSubmit}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Is Submitting</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default SubmitModal;
