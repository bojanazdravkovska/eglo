"use client"
import { useSearchParams } from "next/navigation"
import { useState, useEffect, useCallback, Suspense } from "react"
import ProductCard from "../../components/ProductCard"
import { Input } from "../../components/Input"
import { Button } from "../../components/Button"
import { Search } from "lucide-react"
import Link from "next/link"
import productsData from "../../data/products.json"

interface Product {
  id: string
  slug: string
  name: string
  price: string
  category: string
  images: string[]
  description?: string
  product_details: Record<string, string | number | boolean | undefined>
}

function SearchPageContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [searchTerm, setSearchTerm] = useState(query)
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const performSearch = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) {
      setFilteredProducts([])
      return
    }

    const searchLower = searchQuery.toLowerCase()
    const results = products.filter((product) => {
      // Search only in product name
      return product.name.toLowerCase().includes(searchLower)
    })

    setFilteredProducts(results)
  }, [products])

  useEffect(() => {
    // Load products data
    setProducts(productsData.products)
    setLoading(false)
  }, [])

  useEffect(() => {
    if (query && products.length > 0) {
      performSearch(query)
    } else if (products.length > 0) {
      setFilteredProducts([])
    }
  }, [query, products, performSearch])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      const url = new URL(window.location.href)
      url.searchParams.set("q", searchTerm.trim())
      window.history.pushState({}, "", url.toString())
      performSearch(searchTerm.trim())
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm p-4">
                  <div className="h-48 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {query ? `Search results for: '${query}'` : "Search Products"}
          </h1>
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for lights, fans, and more..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-3 border-gray-200 focus:border-teal-500 focus:ring-teal-500 w-full"
              />
              <Button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                size="sm"
              >
                Search
              </Button>
            </div>
          </form>
        </div>

        {/* Results */}
        {query && (
          <div className="mb-6">
            <p className="text-gray-600">
              {filteredProducts.length === 0 
                ? "No products found" 
                : `Found ${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''}`
              }
            </p>
          </div>
        )}

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <ProductCard 
                key={`${product.id}-${index}`} 
                productName={product.name}
                productDesc={product.description || ""}
                productPrice={product.price}
                productImg={product.images[0]}
                productSlug={product.slug}
              />
            ))}
          </div>
        ) : query ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search terms or browse our categories
            </p>
            <Link href="/">
              <Button>Browse All Products</Button>
            </Link>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Start your search</h3>
            <p className="text-gray-600">
              Enter a search term above to find products
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm p-4">
                  <div className="h-48 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  )
} 