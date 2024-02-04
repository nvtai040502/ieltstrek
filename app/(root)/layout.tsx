import { currentUser } from "@/actions/auth/user"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { ModalProvider } from "@/components/providers/modal-provider"
import React from "react"

export default async function RootLayout({ children }: {children: React.ReactNode}) {
  const user = await currentUser()

  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader user={user} />
      <main className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </div>
  )
}