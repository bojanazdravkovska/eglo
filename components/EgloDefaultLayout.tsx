import { ReactNode } from "react"
import { Header } from "./Header"
import { Footer } from "./Footer"

interface EgloDefaultLayoutProps {
  children: ReactNode
}

export function EgloDefaultLayout({ children }: EgloDefaultLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
} 