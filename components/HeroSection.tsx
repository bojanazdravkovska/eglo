import Image from "next/image"
import { Button } from "./Button"
import { ChevronRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative h-[600px] bg-gradient-to-r from-amber-50 to-orange-50 overflow-hidden -mx-4 md:-mx-6 lg:-mx-8">
      <div className="absolute inset-0">
        <Image
          src="/assets/images/banner.png"
          alt="Modern living room with elegant lighting"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
      </div>

      <div className="relative h-full flex items-center justify-center px-4 md:px-6 lg:px-8 pt-28">
        <div className="max-w-7xl mx-auto w-full text-center">
          <div className="max-w-2xl mx-auto text-white">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Illuminate Your
              <span className="block text-amber-300">Perfect Space</span>
            </h1>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="primary" className="px-8 py-4 text-lg ml-12">
                Explore Collection
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
