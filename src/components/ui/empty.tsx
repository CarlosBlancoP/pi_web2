import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const emptyVariants = cva("flex flex-col items-center justify-center text-center", {
  variants: {
    size: {
      default: "gap-4 p-8",
      sm: "gap-3 p-6",
      lg: "gap-6 p-12",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

const Empty = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof emptyVariants>
>(({ className, size, ...props }, ref) => (
  <div ref={ref} className={cn(emptyVariants({ size }), className)} {...props} />
))
Empty.displayName = "Empty"

const EmptyHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col items-center gap-2", className)} {...props} />
  ),
)
EmptyHeader.displayName = "EmptyHeader"

const EmptyTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("text-lg font-semibold tracking-tight", className)} {...props} />
  ),
)
EmptyTitle.displayName = "EmptyTitle"

const EmptyDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  ),
)
EmptyDescription.displayName = "EmptyDescription"

const EmptyContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("mt-2", className)} {...props} />,
)
EmptyContent.displayName = "EmptyContent"

//
// ✅ Actualizado: EmptyMedia con soporte para `variant`
//
const emptyMediaVariants = cva("mb-4 flex items-center justify-center", {
  variants: {
    variant: {
      icon: "rounded-full bg-[var(--burgundy)]/10 p-4",
      image: "overflow-hidden rounded-lg",
    },
  },
  defaultVariants: {
    variant: "icon",
  },
})

interface EmptyMediaProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof emptyMediaVariants> {}

const EmptyMedia = React.forwardRef<HTMLDivElement, EmptyMediaProps>(
  ({ className, variant, ...props }, ref) => (
    <div ref={ref} className={cn(emptyMediaVariants({ variant }), className)} {...props} />
  ),
)
EmptyMedia.displayName = "EmptyMedia"

export { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent, EmptyMedia }
