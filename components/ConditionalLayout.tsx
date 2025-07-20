"use client"

import { usePathname } from "next/navigation"
import { EgloDefaultLayout } from "./EgloDefaultLayout"

interface ConditionalLayoutProps {
  children: React.ReactNode
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname()
  
  // Check if this is the login or signup page
  const isAuthPage = pathname === '/login' || pathname === '/signup'
  
  // Set noPadding to true for product and category pages
  const noPadding = pathname.startsWith('/product/') || pathname.startsWith('/category/')

  if (isAuthPage) {
    return <>{children}</>
  }

  return (
    <EgloDefaultLayout noPadding={noPadding}>
      {children}
    </EgloDefaultLayout>
  )
} 