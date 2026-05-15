"use client"

import { motion, type HTMLMotionProps, type Variants } from "framer-motion"
import { cn } from "@/lib/utils"

interface FadeInUpProps extends HTMLMotionProps<"div"> {
  children?: React.ReactNode
  delay?: number
  duration?: number
  distance?: number
}

export function FadeInUp({ 
  children, 
  className,
  delay = 0,
  duration = 0.5,
  distance = 20,
  ...props
}: FadeInUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration, 
        delay,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}

interface StaggerChildrenProps extends HTMLMotionProps<"div"> {
  children?: React.ReactNode
  staggerDelay?: number
  initialDelay?: number
}

export function StaggerChildren({
  children,
  className,
  staggerDelay = 0.1,
  initialDelay = 0,
  ...props
}: StaggerChildrenProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: initialDelay,
          },
        },
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export const StaggerItem = motion.div
export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.21, 0.47, 0.32, 0.98]
    }
  }
}
