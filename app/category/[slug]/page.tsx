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
        <div className="max-w-7xl mx-auto px-0 py-4">
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
      <div className="max-w-7xl mx-auto px-0 py-8">
        {/* Main Content - Full Width */}
        <div className="mb-12">
          {/* Page Title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-8">{category.name}</h1>
          
          {/* Description and Images Section */}
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Text Description */}
            <div className="lg:col-span-1 space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900">{category.name}</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                {category.description.split('\n\n').map((paragraph, index) => (
                  <p key={index}>
                    {paragraph}
                  </p>
                ))}
              </div>
              <Link 
                href="#" 
                className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium transition-colors"
              >
                Read more
                <ChevronRight className="ml-1 w-4 h-4" />
              </Link>
            </div>

            {/* Images */}
            <div className="lg:col-span-3 grid grid-cols-2 gap-2">
              <div className="relative h-96 bg-gray-100 rounded-2xl overflow-hidden">
                <Image
                  src="/assets/images/interior-lights1.jpg"
                  alt="Interior lighting example 1"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-96 bg-gray-100 rounded-2xl overflow-hidden">
                <Image
                  src="/assets/images/interior-lights2.jpg"
                  alt="Interior lighting example 2"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Product Section */}
        <div className="flex gap-8">
          {/* Subcategories Sidebar - Left Side */}
          <div className="w-80 bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
            <div className="space-y-2">
              {category.subcategories.map((subcategory, index) => (
                <div key={subcategory.id || index}>
                  {typeof subcategory === 'string' ? (
                    <Link
                      href="#"
                      className="block py-2 px-3 text-gray-700 hover:text-teal-600 hover:bg-gray-100 rounded transition-colors"
                    >
                      {subcategory}
                    </Link>
                  ) : (
                    <div>
                      <button
                        onClick={() => setExpandedSubcategory(
                          expandedSubcategory === subcategory.id ? null : subcategory.id
                        )}
                        className="w-full flex items-center justify-between py-2 px-3 text-gray-700 hover:text-teal-600 hover:bg-gray-100 rounded transition-colors"
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
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    
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