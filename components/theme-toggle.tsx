'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle({side = "right"}: {side?: "right" | "left" | "top" | "bottom"}) {
  const { setTheme, theme } = useTheme()
  const [_, startTransition] = React.useTransition()

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              startTransition(() => {
                setTheme(theme === 'light' ? 'dark' : 'light')
              })
            }}
          >
            
            {!theme ? null : theme === 'dark' ? (
              <Moon className="transition-all" />
            ) : (
              <Sun className="transition-all" />
            )}
            <span className="sr-only">Toggle theme</span>
          
          </Button>
        </TooltipTrigger>
        <TooltipContent side={side}>
          <p>Theme Mode</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
    
    
  )
}