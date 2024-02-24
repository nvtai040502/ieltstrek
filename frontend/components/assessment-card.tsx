'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Assessment } from '@prisma/client';
import { CheckIcon, EyeOpenIcon, PlusIcon } from '@radix-ui/react-icons';
import { toast } from 'sonner';
import { useEditHook } from '@/global/use-edit-hook';
import { AssessmentExtended } from '@/types/test-exam';
import { cn } from '@/lib/utils';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { PlaceholderImage } from './placeholder-image';

interface AssessmentCardProps extends React.HTMLAttributes<HTMLDivElement> {
  assessment: Assessment;
  variant?: 'default' | 'switchable';
  isAddedToCart?: boolean;
  onSwitch?: () => Promise<void>;
}

export function AssessmentCard({
  assessment,
  variant = 'default',
  isAddedToCart = false,
  onSwitch,
  className,
  ...props
}: AssessmentCardProps) {
  const { onOpen } = useEditHook();
  return (
    <Card
      className={cn('size-full overflow-hidden rounded-sm', className)}
      {...props}
    >
      <div
        role="button"
        onClick={() => onOpen({ type: 'openAssessment', data: { assessment } })}
      >
        <CardHeader className="border-b p-0">
          <AspectRatio ratio={4 / 3}>
            {assessment.imageCover ? (
              <Image
                src={assessment.imageCover}
                alt={assessment.name}
                className="object-cover"
                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
                fill
                loading="lazy"
              />
            ) : (
              <PlaceholderImage className="rounded-none" asChild />
            )}
          </AspectRatio>
        </CardHeader>
        <span className="sr-only">{assessment.name}</span>
        <CardContent className="space-y-1.5 p-4">
          <CardTitle className="line-clamp-1">{assessment.name}</CardTitle>
        </CardContent>
      </div>
    </Card>
  );
}
