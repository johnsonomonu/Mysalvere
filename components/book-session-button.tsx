"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"
import React from "react"
import Link from "next/link"

interface BookSessionButtonProps extends React.ComponentProps<typeof Button> {
  href?: string
  isExternal?: boolean
}

export function BookSessionButton({
  href = "/services",
  isExternal = false,
  children,
  className,
  ...props
}: BookSessionButtonProps) {
  const content = (
    <>
      <Calendar className="mr-2 h-4 w-4" />
      {children || 'Book a Session'}
      <span className="ml-1 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
    </>
  )

  if (isExternal) {
    return (
      <Button 
        variant="vital" 
        className={className} 
        asChild 
        {...props}
      >
        <a href={href} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      </Button>
    )
  }

  return (
    <Button 
      variant="vital" 
      className={className} 
      asChild 
      {...props}
    >
      <Link href={href}>
        {content}
      </Link>
    </Button>
  )
}
