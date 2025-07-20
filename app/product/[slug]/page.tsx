"use client"

import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, ChevronLeft, Download, Plus, Minus, ChevronDown, ChevronUp, Info } from "lucide-react"
import { useState, use } from "react"
import { Button } from "../../../components/Button"
import { Input } from "../../../components/Input"
import { CartPopup } from "../../../components/CartPopup"
import { useCart } from "../../context/CartContext"
import productsData from "../../../data/products.json"
import categoriesData from "../../../data/categories.json"

interface ProductPageProps {
  params: Promise<{
    slug: string
  }>
}

export default function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = use(params) as { slug: string }
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [showCartPopup, setShowCartPopup] = useState(false)
  const [expandedSections, setExpandedSections] = useState({
    product_details: true,
    dimensions: false,
    technical_information: false,
    other_information: false
  })
  
  const { addToCart } = useCart()
  
  // Find the product based on the slug
  const product = productsData.products.find(prod => prod.slug === resolvedParams.slug)

  if (!product) {
    notFound()
  }

  // Find the category name from categories data
  const category = categoriesData.categories.find(cat => cat.id === product.category)
  const categoryName = category?.name || product.category

  const handleQuantityChange = (increment: boolean) => {
    if (increment) {
      setQuantity(prev => prev + 1)
    } else if (quantity > 1) {
      setQuantity(prev => prev - 1)
    }
  }

  const handleAddToCart = () => {
    // Add the product to cart with the selected quantity
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.slug,
        name: product.name,
        price: product.price,
        image: product.images[0]
      })
    }
    
    // Show the popup
    setShowCartPopup(true)
  }

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const renderSpecificationSection = (title: string, data: Record<string, string>, sectionKey: keyof typeof expandedSections) => {
    return (
      <div className="border-b border-gray-200 last:border-b-0">
        <button
          onClick={() => toggleSection(sectionKey)}
          className="w-full flex items-center justify-between py-4 text-left hover:bg-gray-50 transition-colors"
        >
          <span className="font-medium text-gray-900">{title}</span>
          <div className={`transition-transform duration-200 ${expandedSections[sectionKey] ? 'rotate-180' : ''}`}>
            <ChevronDown className="w-5 h-5 text-teal-600" />
          </div>
        </button>
        <div className={`overflow-hidden transition-all duration-200 ease-in-out ${
          expandedSections[sectionKey] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="pb-4 space-y-2">
            {Object.entries(data).map(([key, value]) => (
              <div key={key} className="flex justify-between text-sm">
                <span className="text-gray-600">{key}:</span>
                <span className="text-gray-900 font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ) 
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
            <Link href={`/category/${product.category}`} className="hover:text-teal-600 transition-colors">
              {categoryName}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          {/* Product Images - Left Column */}
          <div className="space-y-4">
            {/* Main Product Image */}
            <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
              />
              
              {/* Left Arrow */}
              {selectedImage > 0 && (
                <button
                  onClick={() => setSelectedImage(selectedImage - 1)}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 hover:text-teal-600 rounded-full p-2 transition-all duration-200 shadow-lg"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}
              
              {/* Right Arrow */}
              {selectedImage < product.images.length - 1 && (
                <button
                  onClick={() => setSelectedImage(selectedImage + 1)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 hover:text-teal-600 rounded-full p-2 transition-all duration-200 shadow-lg"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}
            </div>
            
            {/* Thumbnail Images */}
            <div className="grid grid-cols-5 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-teal-600' : 'border-transparent'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Information - Right Column */}
          <div className="space-y-6">
            {/* Product Title and Price */}
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              <div className="space-y-2">
                <p className="text-3xl md:text-4xl font-bold text-gray-900">
                  {product.price}
                </p>
                <p className="text-sm text-gray-600">
                  {product.priceDetails}
                </p>
                <p className="text-sm text-green-600 font-medium">
                  {product.shippingInfo}
                </p>
              </div>
            </div>

            {/* Product Specifications */}
            <div className="bg-gray-50 rounded-lg overflow-hidden p-5">
              <div className="pb-4 space-y-2">
                {Object.entries(product.product_details).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-sm">
                    <span className="text-gray-600">{key}:</span>
                    <span className="text-gray-900 font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Instruction Manual Download */}
            <div className="border-t border-gray-200 pt-4">
              <Link 
                href="#" 
                className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium transition-colors text-sm"
              >
                <Download className="w-4 h-4 mr-2" />
                Download instruction manual
              </Link>
            </div>

            {/* Add to Cart Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                {/* Quantity Selector */}
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(false)}
                    className="p-2 hover:bg-gray-100 transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="w-16 text-center border-0 focus:ring-0"
                    min="1"
                  />
                  <button
                    onClick={() => handleQuantityChange(true)}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                
                {/* Add to Cart Button */}
                <Button 
                  variant="primary" 
                  className="flex-1 py-3 px-6"
                  onClick={handleAddToCart}
                >
                  Add to cart
                </Button>
              </div>
              
              {/* Warranty Link */}
              <Link 
                href="#" 
                className="inline-block text-teal-600 hover:text-teal-700 font-medium transition-colors text-sm"
              >
                Warranty conditions
              </Link>
            </div>
          </div>
        </div>

        {/* Additional Specifications Below Images */}
        <div className="mt-12">
          <div className="lg:max-w-[calc(50%-1rem)] bg-gray-50 rounded-lg overflow-hidden p-4">
            {renderSpecificationSection("Dimensions", product.dimensions, "dimensions")}
            {renderSpecificationSection("Technical information", product.technical_information, "technical_information")}
            {renderSpecificationSection("Other information", product.other_information, "other_information")}
          </div>
        </div>
      </div>

      {/* Cart Popup */}
      <CartPopup
        productName={product.name}
        isVisible={showCartPopup}
        onClose={() => setShowCartPopup(false)}
      />
    </div>
  ) 
} 