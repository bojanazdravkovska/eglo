import { Button } from "./Button"
import { Plus, Settings, Users, BarChart3 } from "lucide-react"
import Link from "next/link"

export function AdminPanel() {
  return (
    <>
      {/* White spacer for space between banner and panel */}
      <div className="bg-white h-8 -mx-4 md:-mx-6 lg:-mx-8"></div>
      
      <section className="bg-gray-50 border-t border-b border-gray-200 -mx-4 md:-mx-6 lg:-mx-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Admin Dashboard</h2>
            <p className="text-gray-600 mt-1">Manage your products and store</p>
          </div>
          
          <div className="flex gap-3">
            <Link href="/add-product">
              <Button variant="primary" className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Product
              </Button>
            </Link>
            
            <Button variant="outline" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BarChart3 className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Products</p>
                <p className="text-xl font-semibold text-gray-900">1,234</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Users</p>
                <p className="text-xl font-semibold text-gray-900">5,678</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <Settings className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Categories</p>
                <p className="text-xl font-semibold text-gray-900">24</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
} 