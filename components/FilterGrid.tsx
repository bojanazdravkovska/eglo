"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface FilterOption {
  value: string
  label: string
}

interface FilterConfig {
  key: string
  label: string
  options: FilterOption[]
  value?: string
}

interface FilterGridProps {
  filters: FilterConfig[]
  onFilterChange: (key: string, value: string) => void
  className?: string
}

export function FilterGrid({ filters, onFilterChange, className = "" }: FilterGridProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const handleFilterClick = (key: string) => {
    setOpenDropdown(openDropdown === key ? null : key)
  }

  const handleOptionSelect = (key: string, value: string) => {
    onFilterChange(key, value)
    setOpenDropdown(null)
  }

  const handleClickOutside = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.filter-dropdown')) {
      return
    }
    setOpenDropdown(null)
  }

  return (
    <div 
      className={`w-full ${className}`}
      onClick={handleClickOutside}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {filters.map((filter) => (
          <div key={filter.key} className="relative filter-dropdown">
            <button
              onClick={() => handleFilterClick(filter.key)}
              className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors text-left"
            >
              <span className="text-sm font-medium text-gray-700">
                {filter.label}
              </span>
              <ChevronDown className="w-4 h-4 text-teal-600 flex-shrink-0" />
            </button>
            
            {openDropdown === filter.key && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                <div className="py-1">
                  {filter.options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleOptionSelect(filter.key, option.value)}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
} 