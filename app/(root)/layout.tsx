import { currentUser } from "@/actions/auth/user"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"

interface RootLayoutProps
  extends React.PropsWithChildren<{
    modal: React.ReactNode
  }> {}

export default async function RootLayout({ children, modal }: RootLayoutProps) {
  const user = await currentUser()

  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader user={user} />
      <main className="flex-1">
        {children}
        {modal}
      </main>
      <SiteFooter />
    </div>
  )
}