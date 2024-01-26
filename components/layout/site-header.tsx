import Link from "next/link"
import { DashboardIcon, ExitIcon, GearIcon } from "@radix-ui/react-icons"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MainNav } from "./main-nav"
import { siteConfig } from "@/config/routes/root-route"
import { MobileNav } from "./mobile-nav"
import { Icons } from "../ui/icons"
import { dashboardConfig } from "@/config/routes/dashboard-route"
import { ExtendedUser } from "@/auth"

interface SiteHeaderProps {
  user: ExtendedUser | undefined
}

export function SiteHeader({ user }: SiteHeaderProps) {
  

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center">
        <MainNav items={siteConfig.mainNav} />
        <MobileNav
          mainNavItems={siteConfig.mainNav}
          sidebarNavItems={dashboardConfig.sidebarNav}
        />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            {/* <ProductsCommandMenu />
            <CartSheet /> */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    className="relative size-8 rounded-full"
                  >
                    <Avatar className="size-8">
                      <AvatarImage
                        src={user.image!}
                        alt={user.name ?? ""}
                      />
                      <AvatarFallback>{user.name}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/stores">
                        <DashboardIcon
                          className="mr-2 size-4"
                          aria-hidden="true"
                        />
                        Dashboard
                        <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/billing">
                        <Icons.credit
                          className="mr-2 size-4"
                          aria-hidden="true"
                        />
                        Billing
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/account">
                        <GearIcon className="mr-2 size-4" aria-hidden="true" />
                        Settings
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/signout">
                      <ExitIcon className="mr-2 size-4" aria-hidden="true" />
                      Log out
                      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button size="sm">
                <Link href="/signin">
                  Sign In
                  <span className="sr-only">Sign In</span>
                </Link>
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}