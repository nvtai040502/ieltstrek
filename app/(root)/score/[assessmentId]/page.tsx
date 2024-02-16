import { Suspense } from 'react';
import { ParamsScorePageSchema } from '@/lib/validations/params';
import ScoreHeaderRender from '@/components/score/header';
import ReviewAndExplainRender from '@/components/score/review-and-explain';
import { Shell } from '@/components/shells/shell';

interface ScorePageProps {
  params: {
    assessmentId: string;
  };
  searchParams: {};
}
async function ScorePage({ params, searchParams }: ScorePageProps) {
  const { part: partIndex } = ParamsScorePageSchema.parse(searchParams);
  return (
    <Shell variant="default" className="max-w-4xl">
      <Suspense fallback={<></>}>
        <ScoreHeaderRender assessmentId={params.assessmentId} />
      </Suspense>
      <Suspense fallback={<></>}>
        <ReviewAndExplainRender
          assessmentId={params.assessmentId}
          partIndex={Number(partIndex)}
        />
      </Suspense>
    </Shell>
  );
}

export default ScorePage;