import { Button } from "./Button"
import { Plus, Settings, Users, BarChart3, Package, Home, LogOut } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function AdminNavigation() {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/assets/images/Logo_EGLO.png"
                alt="EGLO Logo"
                width={32}
                height={24}
              />
              <span className="text-xl font-bold text-gray-900">EGLO Admin</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            <Link href="/admin">
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Dashboard
              </Button>
            </Link>
            
            <Link href="/admin/products">
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <Package className="w-4 h-4" />
                Products
              </Button>
            </Link>
            
            <Link href="/admin/users">
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Users
              </Button>
            </Link>
            
            <Link href="/admin/settings">
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </Button>
            </Link>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Link href="/add-product">
              <Button variant="primary" size="sm" className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Product
              </Button>
            </Link>
            
            <Link href="/">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                View Site
              </Button>
            </Link>
            
            <Button variant="ghost" size="sm" className="flex items-center gap-2 text-red-600 hover:text-red-700">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
