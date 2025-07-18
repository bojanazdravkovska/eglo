import { ReactNode } from "react"
import { Header } from "./Header"
import { Footer } from "./Footer"

interface EgloDefaultLayoutProps {
  children: ReactNode
  noPadding?: boolean
}

export function EgloDefaultLayout({ children, noPadding = false }: EgloDefaultLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header noPadding={noPadding} />
      <main className={`flex-1 ${noPadding ? 'p-0' : 'px-4 md:px-6 lg:px-8 py-4 md:py-6 lg:py-8'}`}>
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
      <Footer noPadding={noPadding} />
    </div>
  )
} 