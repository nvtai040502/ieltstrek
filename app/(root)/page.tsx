import Link from 'next/link';
import { db } from '@/lib/db';
import { cn } from '@/lib/utils';
import { AssessmentCard } from '@/components/assessment-card';
import { ContentSection } from '@/components/content-section';
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading
} from '@/components/page-header';
import { ActionButton } from '@/components/test-exam/action-button';
import { Button, buttonVariants } from '@/components/ui/button';

const RootPage = async () => {
  const assessments = await db.assessment.findMany();
  return (
    <div className="container relative">
      <PageHeader>
        <PageHeaderHeading>Build your component library</PageHeaderHeading>
        <PageHeaderDescription>
          Beautifully designed components that you can copy and paste into your
          apps. Accessible. Customizable. Open Source.
        </PageHeaderDescription>
        <PageActions>
          <Link href="/" className={cn(buttonVariants())}>
            Test Now
          </Link>
          <ActionButton
            actionType="create"
            editType="createAssessment"
            data={{}}
          >
            <div className={buttonVariants({ variant: 'outline' })}>
              Create Now
            </div>
          </ActionButton>
        </PageActions>
      </PageHeader>

      <ContentSection
        title="Latest IELTS test releases"
        description="Description"
        href="/"
        linkText="View all test"
        className="pt-8 md:pt-10 lg:pt-12"
      >
        {assessments.map(
          (assessment) =>
            assessment.isPublic && (
              <AssessmentCard key={assessment.id} assessment={assessment} />
            )
        )}
      </ContentSection>
    </div>
  );
};
export default RootPage;
