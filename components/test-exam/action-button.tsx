'use client';

import React, { useContext } from 'react';
import { usePathname } from 'next/navigation';
import { Delete, Edit, Plus, XCircle } from 'lucide-react';
import { EditData, EditType } from '@/global/edit-context';
import { ExamContext } from '@/global/exam-context';
import { useEditHook } from '@/global/use-edit-hook';
import { Button } from '../ui/button';

export const ActionButton = ({
  actionType,
  editType,
  data,
  children
}: {
  actionType: 'create' | 'update' | 'delete' | 'close';
  editType: EditType;
  data?: EditData;
  children?: React.ReactNode;
}) => {
  const { onOpen, onClose } = useEditHook();
  const { mode } = useContext(ExamContext);
  const pathName = usePathname();
  const renderIcon = () => {
    switch (actionType) {
      case 'create':
        return children || <Plus />;
      case 'update':
        return children || <Edit />;
      case 'delete':
        return children || <Delete />;
      case 'close':
        return children || <XCircle />;
      default:
        return null;
    }
  };
  if (mode !== 'edit' && pathName !== '/') {
    return null;
  }
  return (
    <Button
      variant="ghost"
      size="xs"
      onClick={() =>
        actionType === 'close' ? onClose() : onOpen({ type: editType, data })
      }
    >
      {renderIcon()}
    </Button>
  );
};
