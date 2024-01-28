import { Button, buttonVariants } from "@/components/ui/button"
import { AlignJustify, Bell, Wifi } from 'lucide-react';
import { Icons } from "../ui/icons"

export function AssessmentSiteHeader() {
  return (
      <div className="px-4 py-2 flex items-center ">
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
  )
}