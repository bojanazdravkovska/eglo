"use client"

import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, ChevronDown } from "lucide-react"
import { useState, use } from "react"
import categoriesData from "../../../data/categories.json"
import ProductCard from "../../../components/ProductCard"

interface CategoryPageProps {
  params: Promise<{
    slug: string
  }>
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = use(params) as { slug: string }
  const category = categoriesData.categories.find(cat => cat.id === resolvedParams.slug)
  const [expandedSubcategory, setExpandedSubcategory] = useState<string | null>(null)
  
  if (!category) {
    notFound()
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
      <div className="max-w-7xl mx-auto px-4 md:px-2 lg:px-2 py-4 md:py-12">
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

        {/* Product Section */}
        <div className="flex flex-col lg:flex-row gap-8 md:gap-6 mt-18">
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

          {/* Product Grid */}
          <div className="flex-1 order-1 lg:order-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-4">
    
              {/* Duplicate cards for demo */}
              {[...Array(12)].map((_, index) => (
                <ProductCard
                  key={index}
                  productName="MOGANO 3 ceiling light"
                  productDesc="Modern ceiling light with elegant design"
                  productPrice="€299"
                  productImg="/assets/images/MOGANO-3-ceiling-light.jpg"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 