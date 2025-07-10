import Link from "next/link"
import { Search, MapPin, User, ShoppingCart, Lightbulb, Fan, Zap, Home } from "lucide-react"
import { Button } from "./Button"
import { Input } from "./Input"
import { Badge } from "./Badge"

export function Header() {
  return (
    <header className="border-b border-gray-100">
      {/* Top Bar */}
      <div className="bg-gray-50 py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm text-gray-600">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>Find a Store</span>
            </div>
            <span>|</span>
            <span>Customer Support</span>
            <span>|</span>
            <span>EN</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Free Shipping on Orders $99+</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="py-4 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-8 h-8 bg-teal-600 rounded mr-3"></div>
            <span className="text-2xl font-bold text-gray-900">LUMINA</span>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search for lights, fans, and more..."
                className="pl-10 py-3 border-gray-200 focus:border-teal-500 focus:ring-teal-500"
              />
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span className="hidden md:inline">Account</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden md:inline">Cart</span>
              <Badge variant="secondary" className="ml-1">
                0
              </Badge>
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center gap-8 py-4">
            <Link
              href="#"
              className="flex items-center gap-2 text-gray-700 hover:text-teal-600 transition-colors font-medium"
            >
              <Lightbulb className="w-4 h-4" />
              Interior Lights
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 text-gray-700 hover:text-teal-600 transition-colors font-medium"
            >
              <Zap className="w-4 h-4" />
              Outdoor Lights
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 text-gray-700 hover:text-teal-600 transition-colors font-medium"
            >
              <Fan className="w-4 h-4" />
              Ceiling Fans
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 text-gray-700 hover:text-teal-600 transition-colors font-medium"
            >
              <Home className="w-4 h-4" />
              Smart Lighting
            </Link>
            <Link href="#" className="text-gray-700 hover:text-teal-600 transition-colors font-medium">
              Inspiration
            </Link>
            <Link href="#" className="text-red-600 hover:text-red-700 transition-colors font-semibold">
              Sale %
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
