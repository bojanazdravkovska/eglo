"use client"

import { AdminNavigation } from "../../../components/AdminNavigation"
import { AdminPanel } from "../../../components/AdminPanel"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavigation />
    
        <AdminPanel />

    </div>
  )
} 