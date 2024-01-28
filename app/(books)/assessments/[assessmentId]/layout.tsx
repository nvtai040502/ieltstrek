import { AssessmentContentHeader } from "@/components/books/assessment-content-header";
import { AssessmentSiteHeader } from "@/components/books/assessment-side-header";
import PartsNavigator from "@/components/books/parts-nav";
import React from "react";

export default async function AssessmentLayout({ children }: {children: React.ReactNode}) {

  return (
    <div className="max-h-screen h-screen flex flex-col">
      <AssessmentSiteHeader />
      <AssessmentContentHeader />
      <div className="flex-grow overflow-y-auto">
        {children}
      </div>
      <PartsNavigator />
    </div>
  
  )
}