import { SiteHeader } from "@/components/layout/site-header";
import { TestContentHeader } from "@/components/layout/test-layout/test-content-header";
import { TestSiteHeader } from "@/components/layout/test-layout/test-side-header";
import { Icons } from "@/components/ui/icons";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

interface TestLayoutProps
  extends React.PropsWithChildren<{
  }> {}

export default async function TestLayout({ children }: TestLayoutProps) {

  return (
    <div className="flex min-h-screen flex-col">
      <TestSiteHeader />
      <TestContentHeader />
      
      <main className="">
        {children}
      </main>
    </div>
  )
}