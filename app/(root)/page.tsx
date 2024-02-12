import { ActionButton } from "@/components/books/action-button";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import Link from "next/link";
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
      </PageHeader>
      <ActionButton actionType="create" editType="createAssessment" data={{}} />
      {assessments.map((assessment) => (
        <Link key={assessment.id} href={`assessments/${assessment.id}`}>
          <Button>{assessment.name}</Button>
        </Link>
      ))}
    </div>
  );
};
export default RootPage;
