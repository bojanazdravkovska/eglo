import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

interface ProductCardProps {
  productName: string
  productDesc: string
  productPrice: string
  productImg: string
  productSlug?: string
}

export default function ProductCard({ 
  productName, 
  productDesc, 
  productPrice, 
  productImg,
  productSlug
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Create the view image path by replacing the filename
  const viewImagePath = productImg.replace('.jpg', '-view.jpg')

  // Only use the hover image if it exists in the images array
  // We'll assume productImg is the first image, and if a corresponding -view.jpg exists in the same folder, it should be in the images array
  // So, let's check for it in the images array if available
  // For this, let's accept an optional productImages prop (array) and check for viewImagePath
  // Fallback: if not provided, just use productImg
  const productImages = (typeof productImg === 'string' ? [productImg] : productImg) as string[];
  const hasViewImage = productImages.includes(viewImagePath);

  const cardContent = (
    <div 
      className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 bg-gray-100">
        <Image
          src={isHovered && hasViewImage ? viewImagePath : productImg}
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
          <button 
            className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )

  // If productSlug is provided, wrap in Link, otherwise return just the card
  if (productSlug) {
    return (
      <Link href={`/product/${productSlug}`} className="block">
        {cardContent}
      </Link>
    )
  }

  return cardContent
} 