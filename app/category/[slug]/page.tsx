"use client"

import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, ChevronDown } from "lucide-react"
import { useState, use } from "react"
import { usePathname } from "next/navigation"
import categoriesData from "../../../data/categories.json"
import productsData from "../../../data/products.json"
import categoryFiltersData from "../../../data/categoryFilters.json"
import ProductCard from "../../../components/ProductCard"
import { FilterGrid } from "../../../components/FilterGrid"

interface SubSubcategory {
  id: string
  name: string
}

interface CategoryPageProps {
  params: Promise<{
    slug: string
  }>
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = use(params) as { slug: string }
  const pathname = usePathname()
  const category = categoriesData.categories.find(cat => cat.id === resolvedParams.slug)
  const [expandedSubcategory, setExpandedSubcategory] = useState<string | null>(null)
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({})
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false)
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false)
  
  if (!category) {
    notFound()
  }

  // Filter products by category
  const categoryProducts = productsData.products.filter(product => product.category === resolvedParams.slug)

  // Show 12 instances for category pages
  const fallbackProduct = {
    id: "fallback",
    name: "Sample Product",
    description: "This is a sample product for demonstration purposes.",
    price: "$99.99",
    images: ["/assets/images/E27-bulb.jpg"],
    slug: "sample-product"
  }
  
  const displayProducts = pathname.startsWith('/category/')
    ? Array(12).fill(categoryProducts[0] || fallbackProduct) // Show 12 instances for 4x3 grid
    : categoryProducts

  // Get filters from JSON file
  const categoryFilters = categoryFiltersData.filters

  const handleFilterChange = (key: string, value: string) => {
    if (value) {
      // Split comma-separated values and update the filter
      const values = value.split(',')
      setActiveFilters(prev => ({
        ...prev,
        [key]: values
      }))
    } else {
      // Remove the filter if no values
      setActiveFilters(prev => {
        const newFilters = { ...prev }
        delete newFilters[key]
        return newFilters
      })
    }
  }

  const handleResetFilters = () => {
    setActiveFilters({})
  }

  const handleRemoveFilter = (filterKey: string, valueToRemove: string) => {
    const newActiveFilters = { ...activeFilters }
    if (newActiveFilters[filterKey]) {
      newActiveFilters[filterKey] = newActiveFilters[filterKey].filter(value => value !== valueToRemove)
      if (newActiveFilters[filterKey].length === 0) {
        delete newActiveFilters[filterKey]
      }
    }
    setActiveFilters(newActiveFilters)
  }

  // Get all selected values for badges
  const getAllSelectedValues = () => {
    const allValues: string[] = []
    Object.entries(activeFilters).forEach(([filterKey, values]) => {
      const filter = categoryFilters.find(f => f.key === filterKey)
      if (filter) {
        values.forEach(value => {
          const option = filter.options.find(o => o.value === value)
          if (option) {
            allValues.push(option.label)
          }
        })
      }
    })
    return allValues
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-teal-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">{category.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-1 md:px-2 lg:px-2 py-4 md:py-12">
        {/* Main Content - Full Width */}
        <div className="mb-6 md:mb-8">
          {/* Page Title */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6">{category.name}</h1>
          
          {/* Description and Images Section */}
          <div className="grid lg:grid-cols-4 gap-4 md:gap-6">
            {/* Text Description */}
            <div className="lg:col-span-1 space-y-3 md:space-y-4">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900">{category.name}</h2>
              <div className="space-y-2 md:space-y-3 text-gray-600 leading-relaxed text-sm md:text-base">
                {category.description.split('\n\n').map((paragraph, index) => (
                  <p key={index}>
                    {paragraph}
                  </p>
                ))}
              </div>
              <Link 
                href="#" 
                className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium transition-colors text-sm md:text-base"
              >
                Read more
                <ChevronRight className="ml-1 w-4 h-4" />
              </Link>
            </div>

            {/* Images */}
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 bg-gray-100 rounded-lg md:rounded-2xl overflow-hidden">
                <Image
                  src={category.images?.image1 || "/assets/images/interior-lights1.jpg"}
                  alt={`${category.name} example 1`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 bg-gray-100 rounded-lg md:rounded-2xl overflow-hidden">
                <Image
                  src={category.images?.image2 || "/assets/images/interior-lights2.jpg"}
                  alt={`${category.name} example 2`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Product Section with Filters */}
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
          {/* Subcategories Sidebar - Mobile: Full width, Desktop: Fixed width */}
          <div className="hidden lg:block lg:w-80 bg-gray-50 rounded-lg p-3 md:p-4 order-2 lg:order-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 md:mb-4">Categories</h3>
            <div className="space-y-1 md:space-y-2">
              {category.subcategories.map((subcategory, index) => (
                <div key={subcategory.id || index}>
                  {typeof subcategory === 'string' ? (
                    <Link
                      href="#"
                      className="block py-2 px-3 text-gray-700 hover:text-teal-600 hover:bg-gray-100 rounded transition-colors text-sm md:text-base"
                    >
                      {subcategory}
                    </Link>
                  ) : (
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        <Link
                          href={`/subcategory/${subcategory.id}`}
                          className="flex-1 py-2 px-3 text-gray-700 hover:text-teal-600 hover:bg-gray-100 rounded transition-colors text-sm md:text-base text-left"
                          style={{ textDecoration: 'none' }}
                        >
                          {subcategory.name}
                        </Link>
                        {subcategory.subcategories.length > 0 && (
                          <button
                            onClick={() => setExpandedSubcategory(
                              expandedSubcategory === subcategory.id ? null : subcategory.id
                            )}
                            className="ml-1 p-1 rounded hover:bg-gray-100"
                            aria-label={expandedSubcategory === subcategory.id ? 'Collapse' : 'Expand'}
                          >
                            {expandedSubcategory === subcategory.id ? (
                              <ChevronDown className="w-4 h-4 text-teal-600" />
                            ) : (
                              <ChevronRight className="w-4 h-4 text-teal-600" />
                            )}
                          </button>
                        )}
                      </div>
                      {expandedSubcategory === subcategory.id && subcategory.subcategories.length > 0 && (
                        <div className="ml-4 mt-1 space-y-1 animate-in slide-in-from-top-2 duration-200">
                          {subcategory.subcategories.map((subSubcategory: SubSubcategory | string, subIndex: number) =>
                            typeof subSubcategory === 'string' ? (
                              <Link
                                key={subIndex}
                                href="#"
                                className="block py-1 px-3 text-sm text-gray-600 hover:text-teal-600 hover:bg-gray-100 rounded transition-colors"
                              >
                                {subSubcategory}
                              </Link>
                            ) : (
                              <Link
                                key={subSubcategory.id}
                                href={`/subcategory/${subSubcategory.id}`}
                                className="block py-1 px-3 text-sm text-gray-600 hover:text-teal-600 hover:bg-gray-100 rounded transition-colors"
                              >
                                {subSubcategory.name}
                              </Link>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Filters and Products */}
          <div className="flex-1 order-1 lg:order-2">
            {/* Mobile Categories and Filters Buttons */}
            <div className="lg:hidden mb-4">
              <div className="grid grid-cols-2 gap-3">
                {/* Categories Button */}
                <button
                  onClick={() => {
                    setIsCategoriesOpen(!isCategoriesOpen)
                    if (!isCategoriesOpen) {
                      setIsFilterPanelOpen(false)
                    }
                  }}
                  className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors text-left"
                >
                  <span className="text-sm font-medium text-gray-700">
                    Categories
                  </span>
                  <ChevronDown className={`w-4 h-4 text-teal-600 transition-transform ${isCategoriesOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Filters Button */}
                <button
                  onClick={() => {
                    setIsFilterPanelOpen(!isFilterPanelOpen)
                    if (!isFilterPanelOpen) {
                      setIsCategoriesOpen(false)
                    }
                  }}
                  className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors text-left"
                >
                  <span className="text-sm font-medium text-gray-700">
                    Filters
                  </span>
                  <ChevronDown className={`w-4 h-4 text-teal-600 transition-transform ${isFilterPanelOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </div>

            {/* Mobile Categories Dropdown */}
            {isCategoriesOpen && (
              <div className="lg:hidden mb-4">
                <div className="rounded-lg p-4" style={{ backgroundColor: '#e7f5f5' }}>
                  {category.subcategories.map((subcategory, index) => (
                    <div key={subcategory.id || index}>
                      {typeof subcategory === 'string' ? (
                        <Link
                          href="#"
                          className="block py-3 text-left hover:bg-white/50 transition-colors rounded"
                        >
                          <span className="text-sm font-medium text-gray-700">
                            {subcategory}
                          </span>
                        </Link>
                      ) : (
                        <div>
                          <button
                            onClick={() => setExpandedSubcategory(
                              expandedSubcategory === subcategory.id ? null : subcategory.id
                            )}
                            className="w-full flex items-center justify-between py-3 text-left hover:bg-white/50 transition-colors rounded"
                          >
                            <span className="text-sm font-medium text-gray-700">
                              {subcategory.name}
                            </span>
                            {subcategory.subcategories.length > 0 && (
                              expandedSubcategory === subcategory.id ? (
                                <ChevronDown className="w-4 h-4 text-teal-600" />
                              ) : (
                                <ChevronRight className="w-4 h-4 text-teal-600" />
                              )
                            )}
                          </button>
                          {expandedSubcategory === subcategory.id && subcategory.subcategories.length > 0 && (
                            <div className="ml-4 mt-1 space-y-1">
                              {subcategory.subcategories.map((subSubcategory: SubSubcategory | string, subIndex: number) =>
                                typeof subSubcategory === 'string' ? (
                                  <Link
                                    key={subIndex}
                                    href="#"
                                    className="block py-2 px-3 text-sm text-gray-600 hover:bg-white/50 rounded transition-colors"
                                  >
                                    {subSubcategory}
                                  </Link>
                                ) : (
                                  <Link
                                    key={subSubcategory.id}
                                    href={`/subcategory/${subSubcategory.id}`}
                                    className="block py-2 px-3 text-sm text-gray-600 hover:bg-white/50 rounded transition-colors"
                                  >
                                    {subSubcategory.name}
                                  </Link>
                                )
                              )}
                            </div>
                          )}
                        </div>
                      )}
                      
                      {/* Divider Line (except for last item) */}
                      {index < category.subcategories.length - 1 && (
                        <div className="border-t border-white my-2"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Filters Section */}
            <div className="mb-6 md:mb-8">
              <div className="hidden md:block bg-white border border-gray-200 rounded-lg p-4 md:p-6">
                <FilterGrid 
                  filters={categoryFilters}
                  onFilterChange={handleFilterChange}
                  onResetFilters={handleResetFilters}
                  selectedFilters={activeFilters}
                  onSelectedFiltersChange={setActiveFilters}
                />
              </div>
              
              {/* Mobile Filters - No container or heading */}
              <div className="md:hidden">
                <FilterGrid 
                  filters={categoryFilters}
                  onFilterChange={handleFilterChange}
                  onResetFilters={handleResetFilters}
                  showMobileButton={false}
                  isFilterPanelOpen={isFilterPanelOpen}
                  onToggleFilterPanel={setIsFilterPanelOpen}
                  selectedFilters={activeFilters}
                  onSelectedFiltersChange={setActiveFilters}
                />
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 md:gap-4">
              {displayProducts.map((product, index) => (
                <ProductCard
                  key={`${product.id}-${index}`}
                  productName={product.name}
                  productDesc={product.description}
                  productPrice={product.price}
                  productImg={product.images[0]}
                  productSlug={product.slug}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 