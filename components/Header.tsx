"use client"
import Link from "next/link"
import Image from "next/image"
import { Search, MapPin, User, ShoppingCart, Menu, X } from "lucide-react"
import { Button } from "./Button"
import { Input } from "./Input"
import { Badge } from "./Badge"
import { Navigation } from "./Navigation"
import { useState } from "react"
import { useCart } from "../app/context/CartContext"
import { useRouter } from "next/navigation"

interface HeaderProps {
  noPadding?: boolean
}

export function Header({ noPadding = false }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const { getTotalItems } = useCart()
  const cartItemCount = getTotalItems()
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`)
    }
  }

  return (
    <header className="border-b border-gray-100">
      {/* Top Bar */}
      <div className="bg-gray-50 py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm text-gray-600">
          <div className="flex items-center gap-2 md:gap-4">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span className="hidden sm:inline">Find a Store</span>
            </div>
            <span className="hidden sm:inline">|</span>
            <span className="hidden md:inline">Customer Support</span>
            <span className="hidden md:inline">|</span>
            <span>EN</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">Free Shipping on Orders $99+</span>
            <span className="sm:hidden">Free Shipping $99+</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className={`py-4 ${noPadding ? 'px-0' : 'px-4'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <Image
              src="/assets/images/Logo_EGLO.png"
              alt="EGLO Logo"
              width={120}
              height={40}
              className="h-8 w-auto"
            />
          </Link>

          {/* Search - Hidden on mobile, shown on tablet and up */}
          <div className="hidden sm:flex flex-1 max-w-xl mx-4 lg:mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for lights, fans, and more..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-3 border-gray-200 focus:border-teal-500 focus:ring-teal-500 w-full"
              />
            </form>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="flex items-center gap-1 md:gap-2 p-2 md:p-3 hover:text-teal-600 transition-colors">
                <User className="w-5 h-5" />
                <span className="hidden lg:inline">Login</span>
              </Button>
            </Link>
            <Button variant="ghost" size="sm" className="flex items-center gap-1 md:gap-2 p-2 md:p-3 relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden lg:inline">Cart</span>
              {cartItemCount > 0 && (
                <Badge variant="secondary" className="absolute -top-1 -right-1 md:static md:ml-1 bg-teal-600 text-white">
                  {cartItemCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="sm:hidden mt-4 px-4">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search for lights, fans, and more..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3 border-gray-200 focus:border-teal-500 focus:ring-teal-500 w-full"
            />
          </form>
        </div>
      </div>

      {/* Navigation */}
      <Navigation isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
    </header>
  )
}
