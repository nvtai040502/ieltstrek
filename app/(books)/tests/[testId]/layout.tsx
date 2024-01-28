import QuestionPalette from "@/components/books/question-palette";
import SectionsNavigator from "@/components/books/sections-nav";
import { SiteHeader } from "@/components/layout/site-header";
import { TestContentHeader } from "@/components/layout/test-layout/test-content-header";
import { TestSiteHeader } from "@/components/layout/test-layout/test-side-header";
import { Icons } from "@/components/ui/icons";
import { Separator } from "@/components/ui/separator";
import { QrCode } from "lucide-react";
import Link from "next/link";

interface TestLayoutProps
  extends React.PropsWithChildren<{
  }> {}

export default async function TestLayout({ children }: TestLayoutProps) {

  return (
    <div className="max-h-screen h-screen flex flex-col">
      <TestSiteHeader />
      <TestContentHeader />
      <div className="flex-grow overflow-y-auto">
        {children}
      </div>
      <SectionsNavigator />
    </div>
  
  )
}