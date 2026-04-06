"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"
import React from "react"

interface BookSessionButtonProps extends React.ComponentProps<typeof Button> {
  sessionType?: 'discovery' | 'coaching' | 'corporate'
  flutterwaveStoreUrl?: string
}

const FLUTTERWAVE_STORE_URL = "https://flutterwave.com/store/salvere"

export function BookSessionButton({
  sessionType = 'discovery',
  flutterwaveStoreUrl = FLUTTERWAVE_STORE_URL,
  children,
  ...props
}: BookSessionButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Construct URL with session type parameter
    const url = new URL(flutterwaveStoreUrl)
    url.searchParams.set('session', sessionType)
    window.open(url.toString(), '_blank', 'noopener,noreferrer')
    
    if (props.onClick) {
      props.onClick(e)
    }
  }

  return (
    <Button variant="vital" onClick={handleClick} {...props}>
      <Calendar className="mr-2 h-4 w-4" />
      {children || 'Book a Session'}
    </Button>
  )
}
