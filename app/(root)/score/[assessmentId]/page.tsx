import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import ScoreHeaderRender from '@/components/score/header';
import { Shell } from '@/components/shells/shell';

interface ScorePageProps {
  params: {
    assessmentId: string;
  };
}
async function ScorePage({ params }: ScorePageProps) {
  return (
    <Shell variant="default" className="max-w-4xl">
      <Suspense fallback={<></>}>
        <ScoreHeaderRender assessmentId={params.assessmentId} />
      </Suspense>
    </Shell>
  );
}

export default ScorePage;
