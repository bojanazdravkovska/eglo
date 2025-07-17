import Image from "next/image"
import { useState } from "react"

interface ProductCardProps {
  productName: string
  productDesc: string
  productPrice: string
  productImg: string
}

export default function ProductCard({ 
  productName, 
  productDesc, 
  productPrice, 
  productImg 
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  // Create the view image path by replacing the filename
  const viewImagePath = productImg.replace('.jpg', '-view.jpg')
  
  return (
    <div 
      className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 bg-gray-100">
        <Image
          src={isHovered ? viewImagePath : productImg}
          alt={productName}
          fill
          className="object-cover transition-opacity duration-300"
        />
        <div className="absolute top-2 left-2">
          <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">NEW</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{productName}</h3>
        <p className="text-gray-600 text-sm mb-3">{productDesc}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">{productPrice}</span>
          <button className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
} 