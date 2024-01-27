import Link from "next/link"
import { DashboardIcon, ExitIcon, GearIcon } from "@radix-ui/react-icons"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button, buttonVariants } from "@/components/ui/button"
import { AlignJustify, Bell, Wifi } from 'lucide-react';
import { MainNav } from "./main-nav"
import { siteConfig } from "@/config/routes/root-route"
import { MobileNav } from "./mobile-nav"
import { Icons } from "../ui/icons"
import { dashboardConfig } from "@/config/routes/dashboard-route"
import { ExtendedUser } from "@/auth"
import { LogoutButton } from "../auth/logout-button"
import { LoginButton } from "../auth/login-button"



export function TestSiteHeader() {
  return (
    <header className="">
      <div className="p-2 flex h-16 items-center">
      <div className="gap-6 flex items-center" >
        <Icons.logo className="h-6 w-6" aria-hidden="true" />
        <div className="">
          <p className=" font-bold">
            Title
          </p>
          <p>
            Description
          </p>

        </div>
      </div>
        <div className="flex flex-1 items-center justify-end m">
          <nav className="flex items-center">
            <div className="p-4">
              <Wifi />
            </div>
            <Button variant="ghost">
              <Bell />
            </Button>
            <Button variant="ghost">
              <AlignJustify />
            </Button>
            
              
              
          </nav>
        </div>
      </div>
    </header>
  )
}