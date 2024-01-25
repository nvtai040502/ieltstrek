import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full">
      <div className="sticky top-0 z-20 border-b bg-white">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link href="/">
                <Icons.logo className="h-8 w-8 transition-all duration-75 active:scale-95 cursor-pointer" />
              </Link>
            </div>
            <div className="flex items-center space-x-6">
              <Button variant="outline" className={cn("text-sm hidden sm:block", )}>
                Change Log
              </Button>
              <Button variant="outline" className={cn("text-sm hidden sm:block", )}>
                Help
              </Button>
              <Button variant="outline" className={cn("text-sm hidden sm:block", )}>
                User Dropdown
              </Button>
            </div>
          </div>
      </div>
      {children}
    </div>
  );
}
