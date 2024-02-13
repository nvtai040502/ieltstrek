'use client';

import React from 'react';
import { Button } from '../ui/button';
import { EditData, EditType } from '@/global/edit-context';
import { useEditHook } from '@/global/use-edit-hook';
import { Delete, Edit, Plus, XCircle } from 'lucide-react';

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
