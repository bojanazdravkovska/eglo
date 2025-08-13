"use client"

import { usePathname } from "next/navigation"
import { EgloDefaultLayout } from "./EgloDefaultLayout"

interface ConditionalLayoutProps {
  children: React.ReactNode
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname()
  
  // Check if this is the login, signup, or add-product page (supports locale-prefixed paths)
  const isAuthPage =
    /\/login$/.test(pathname) ||
    /\/signup$/.test(pathname) ||
    /\/add-product$/.test(pathname)
  
  // Set noPadding to true for product, category, and inspiration pages (supports locale-prefixed paths)
  const noPadding =
    /\/product\//.test(pathname) ||
    /\/category\//.test(pathname) ||
    /\/inspiration$/.test(pathname)

  if (isAuthPage) {
    return <>{children}</>
  }

  return (
    <EgloDefaultLayout noPadding={noPadding}>
      {children}
    </EgloDefaultLayout>
  )
} 