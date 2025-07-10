import Image from "next/image"
import { Button } from "./Button"
import { ChevronRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative h-[600px] bg-gradient-to-r from-amber-50 to-orange-50 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/assets/images/Banner-Desktop-herbst.jpg"
          alt="Modern living room with elegant lighting"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl text-white">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            Illuminate Your
            <span className="block text-amber-300">Perfect Space</span>
          </h1>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 text-lg">
              Explore Collection
              <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
