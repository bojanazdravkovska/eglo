import Image from "next/image"
import { Button } from "./Button"
import { Card, CardContent } from "./Card"
import { Badge } from "./Badge"

import { ChevronRight } from "lucide-react"

const categories = [
  {
    title: "Pendant Lights",
    description: "Statement pieces for dining and kitchen areas",
    image: "/assets/images/pendant-lights.jpg",
    badge: "Popular",
  },
  {
    title: "Ceiling Lights",
    description: "Energy-efficient illumination for every room",
    image: "/assets/images/ceiling-lights.jpg",
    badge: "New",
  },
  {
    title: "Wall Lights",
    description: "Elegant wall-mounted lighting solutions",
    image: "/assets/images/wall-lights.jpg",
    badge: "Sale",
  },
  {
    title: "Table Lamps",
    description: "Perfect ambient lighting for any space",
    image: "/assets/images/table-lamps.jpg",
    badge: "Trending",
  },
]

export function CategoryGrid() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Discover Our Assortment</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our comprehensive range of lighting solutions designed to enhance every space in your home
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Card
              key={index}
              className="group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="relative">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.title}
                  width={300}
                  height={500}
                  className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
                  {category.title}
                </h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <Button variant="ghost" className="p-0 h-auto text-teal-600 hover:text-teal-700 font-semibold">
                  Shop Now
                  <ChevronRight className="ml-1 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
