import Image from "next/image"
import { Button } from "./Button"
import { Badge } from "./Badge"
import { Card, CardContent } from "./Card"
import { ChevronRight, Star } from "lucide-react"

const products = [
  {
    name: "Modern Brass Pendant",
    price: "$299",
    originalPrice: "$399",
    rating: 4.8,
    reviews: 124,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "Industrial Ceiling Fan",
    price: "$449",
    rating: 4.9,
    reviews: 89,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "Smart LED Strip Kit",
    price: "$79",
    rating: 4.7,
    reviews: 256,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "Outdoor Wall Sconce",
    price: "$159",
    rating: 4.6,
    reviews: 67,
    image: "/placeholder.svg?height=300&width=300",
  },
]

export function FeaturedProducts() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-lg text-gray-600">Handpicked favorites from our latest collection</p>
          </div>
          <Button variant="outline" className="hidden md:flex bg-transparent">
            View All Products
            <ChevronRight className="ml-2 w-4 h-4" />
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <Card
              key={index}
              className="group cursor-pointer border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-white"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.originalPrice && <Badge className="absolute top-4 right-4 bg-red-500">Sale</Badge>}
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({product.reviews})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-gray-900">{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
