import { SiteHeader } from "@/components/layout/site-header";
import { TestSiteHeader } from "@/components/layout/test-side-header";
import { Icons } from "@/components/ui/icons";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

interface TestLayoutProps
  extends React.PropsWithChildren<{
  }> {}

export default async function TestLayout({ children }: TestLayoutProps) {

  return (
    <div className="relative flex min-h-screen flex-col">
      <TestSiteHeader />
      <Separator />
      <main className="">
        {children}
      </main>
    </div>
  )
}