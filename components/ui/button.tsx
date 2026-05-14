import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:     'bg-[var(--charcoal)] text-[var(--soft-white)] hover:bg-[#444444] active:scale-[0.98] shadow-sm',
        vital:       'bg-[var(--orange)] text-white hover:bg-[var(--orange-hover)] active:scale-[0.98] shadow-lg shadow-orange-500/15',
        destructive: 'bg-destructive text-white hover:bg-destructive/90 active:scale-[0.98] focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:     'border border-[var(--border)] bg-transparent text-[var(--charcoal)] hover:bg-[var(--charcoal)] hover:text-[var(--soft-white)] active:scale-[0.98]',
        secondary:   'bg-[var(--muted-sage)] text-white hover:bg-[var(--muted-sage-dark)] active:scale-[0.98] shadow-sm',
        ghost:       'text-[var(--charcoal)] hover:bg-[var(--charcoal)]/5 active:scale-[0.98]',
        link:        'text-[var(--charcoal)] underline-offset-4 hover:underline',
      },
      size: {
        default:  'h-11 px-6 py-2 has-[>svg]:px-4',
        sm:       'h-9 rounded-full gap-1.5 px-5 has-[>svg]:px-3',
        lg:       'h-12 rounded-full px-8 has-[>svg]:px-6',
        xl:       'h-14 rounded-full px-10 text-base',
        icon:     'size-9',
        'icon-sm':'size-8',
        'icon-lg':'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
