import Image from "next/image"
import { ArrowRight } from "lucide-react"

const styles = [
  {
    title: "Scandinavian",
    description: "Clean lines and natural warmth",
    image: "/assets/images/scandinavian.jpg",
  },
  {
    title: "Natural",
    description: "Organic textures and earthy tones",
    image: "/assets/images/natural.jpg",
  },
  {
    title: "Vintage",
    description: "Timeless elegance and classic charm",
    image: "/assets/images/vintage-retro.jpg",
  },
  {
    title: "Industrial",
    description: "Raw materials and urban sophistication",
    image: "/assets/images/industrial-2_3.jpg",
  },
]

export function StyleGrid() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Shop by Style</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find lighting that matches your aesthetic and creates the perfect ambiance for your space
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {styles.map((style, index) => (
            <div key={index} className="group cursor-pointer">
              {/* Card Container with Border */}
              <div className="border border-gray-200 rounded-xl p-4 hover:border-gray-300 hover:shadow-lg transition-all duration-300" style={{ backgroundColor: '#f4f2f1' }}>
                {/* Image Container */}
                <div className="relative h-72 mb-4 overflow-hidden rounded-lg bg-gray-50">
                  <Image
                    src={style.image || "/placeholder.svg"}
                    alt={`${style.title} style lighting`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Hover Content */}
                  <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="flex items-center justify-between text-white">
                      <span className="font-medium text-sm">Explore Style</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Text Content */}
                <div className="text-center px-2">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors duration-300">
                    {style.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{style.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
