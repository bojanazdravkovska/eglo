import { Package, Users, Settings, DollarSign } from "lucide-react"

export function AdminStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-100 rounded-lg">
            <Package className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Products</p>
            <p className="text-2xl font-semibold text-gray-900">1,234</p>
            <p className="text-xs text-green-600">+12% from last month</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-green-100 rounded-lg">
            <Users className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Active Users</p>
            <p className="text-2xl font-semibold text-gray-900">5,678</p>
            <p className="text-xs text-green-600">+8% from last month</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-amber-100 rounded-lg">
            <Settings className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Categories</p>
            <p className="text-2xl font-semibold text-gray-900">24</p>
            <p className="text-xs text-gray-500">No change</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-purple-100 rounded-lg">
            <DollarSign className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Revenue</p>
            <p className="text-2xl font-semibold text-gray-900">$45,678</p>
            <p className="text-xs text-green-600">+15% from last month</p>
          </div>
        </div>
      </div>
    </div>
  )
}
