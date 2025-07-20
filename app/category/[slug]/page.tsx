"use client"

import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, ChevronDown } from "lucide-react"
import { useState, use } from "react"
import { usePathname } from "next/navigation"
import categoriesData from "../../../data/categories.json"
import productsData from "../../../data/products.json"
import ProductCard from "../../../components/ProductCard"
import { FilterGrid } from "../../../components/FilterGrid"

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
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({})
  
  if (!category) {
    notFound()
  }

  // Filter products by category
  const categoryProducts = productsData.products.filter(product => product.category === resolvedParams.slug)

  // Show 12 instances for category pages
  const displayProducts = pathname.startsWith('/category/')
    ? Array(12).fill(categoryProducts[0]) // Show 12 instances for 4x3 grid
    : categoryProducts

  // Sample filters for the category page
  const categoryFilters = [
    {
      key: "price",
      label: "Price",
      options: [
        { value: "0-50", label: "$0 - $50" },
        { value: "50-100", label: "$50 - $100" },
        { value: "100-200", label: "$100 - $200" },
        { value: "200+", label: "$200+" }
      ]
    },
    {
      key: "room",
      label: "Room / Field",
      options: [
        { value: "living-room", label: "Living Room" },
        { value: "bedroom", label: "Bedroom" },
        { value: "kitchen", label: "Kitchen" },
        { value: "bathroom", label: "Bathroom" },
        { value: "dining-room", label: "Dining Room" },
        { value: "office", label: "Office" }
      ]
    },
    {
      key: "product-type",
      label: "Product-Type",
      options: [
        { value: "ceiling-light", label: "Ceiling Light" },
        { value: "wall-light", label: "Wall Light" },
        { value: "table-lamp", label: "Table Lamp" },
        { value: "floor-lamp", label: "Floor Lamp" },
        { value: "pendant-light", label: "Pendant Light" }
      ]
    },
    {
      key: "functions",
      label: "Functions",
      options: [
        { value: "dimmable", label: "Dimmable" },
        { value: "smart-control", label: "Smart Control" },
        { value: "motion-sensor", label: "Motion Sensor" },
        { value: "color-changing", label: "Color Changing" }
      ]
    },
    {
      key: "design",
      label: "Design",
      options: [
        { value: "modern", label: "Modern" },
        { value: "traditional", label: "Traditional" },
        { value: "industrial", label: "Industrial" },
        { value: "minimalist", label: "Minimalist" },
        { value: "vintage", label: "Vintage" }
      ]
    },
    {
      key: "technology",
      label: "Technology",
      options: [
        { value: "led", label: "LED" },
        { value: "incandescent", label: "Incandescent" },
        { value: "fluorescent", label: "Fluorescent" },
        { value: "smart-led", label: "Smart LED" }
      ]
    },
    {
      key: "material",
      label: "Material",
      options: [
        { value: "metal", label: "Metal" },
        { value: "glass", label: "Glass" },
        { value: "plastic", label: "Plastic" },
        { value: "wood", label: "Wood" },
        { value: "fabric", label: "Fabric" }
      ]
    },
    {
      key: "color",
      label: "Color",
      options: [
        { value: "white", label: "White" },
        { value: "black", label: "Black" },
        { value: "silver", label: "Silver" },
        { value: "gold", label: "Gold" },
        { value: "bronze", label: "Bronze" },
        { value: "colored", label: "Colored" }
      ]
    },
    {
      key: "flames",
      label: "Number of flames",
      options: [
        { value: "1", label: "1 Flame" },
        { value: "2", label: "2 Flames" },
        { value: "3", label: "3 Flames" },
        { value: "4", label: "4 Flames" },
        { value: "5+", label: "5+ Flames" }
      ]
    },
    {
      key: "throat",
      label: "Throat",
      options: [
        { value: "small", label: "Small" },
        { value: "medium", label: "Medium" },
        { value: "large", label: "Large" },
        { value: "extra-large", label: "Extra Large" }
      ]
    },
    {
      key: "bulbs-included",
      label: "Bulbs included",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
        { value: "optional", label: "Optional" }
      ]
    },
    {
      key: "energy-class",
      label: "Energy saving class",
      options: [
        { value: "a", label: "Class A" },
        { value: "b", label: "Class B" },
        { value: "c", label: "Class C" },
        { value: "d", label: "Class D" },
        { value: "e", label: "Class E" }
      ]
    }
  ]

  const handleFilterChange = (key: string, value: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [key]: value
    }))
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
          <div className="lg:w-80 bg-gray-50 rounded-lg p-3 md:p-4 order-2 lg:order-1">
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
                    <div>
                      <button
                        onClick={() => setExpandedSubcategory(
                          expandedSubcategory === subcategory.id ? null : subcategory.id
                        )}
                        className="w-full flex items-center justify-between py-2 px-3 text-gray-700 hover:text-teal-600 hover:bg-gray-100 rounded transition-colors text-sm md:text-base"
                      >
                        <span>{subcategory.name}</span>
                        {subcategory.subcategories.length > 0 && (
                          expandedSubcategory === subcategory.id ? (
                            <ChevronDown className="w-4 h-4 text-teal-600" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-teal-600" />
                          )
                        )}
                      </button>
                      {expandedSubcategory === subcategory.id && subcategory.subcategories.length > 0 && (
                        <div className="ml-4 mt-1 space-y-1 animate-in slide-in-from-top-2 duration-200">
                          {subcategory.subcategories.map((subSubcategory, subIndex) => (
                            <Link
                              key={subIndex}
                              href="#"
                              className="block py-1 px-3 text-sm text-gray-600 hover:text-teal-600 hover:bg-gray-100 rounded transition-colors"
                            >
                              {subSubcategory}
                            </Link>
                          ))}
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
            {/* Filters Section */}
            <div className="mb-6 md:mb-8">
              <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 pr-4">Filters</h2>
                  {Object.keys(activeFilters).length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(activeFilters).map(([key, value]) => {
                        const filter = categoryFilters.find(f => f.key === key)
                        const option = filter?.options.find(o => o.value === value)
                        return (
                          <div key={key} className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm">
                            {filter?.label}: {option?.label}
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
                <FilterGrid 
                  filters={categoryFilters}
                  onFilterChange={handleFilterChange}
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