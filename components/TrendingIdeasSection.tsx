import Image from "next/image"
import { TrendingUp, Clock, Users } from "lucide-react"

const trendingIdeas = [
  {
    title: "Smart Lighting Automation",
    description: "Control your entire home's lighting with voice commands and schedules",
    image: "/assets/images/smart-home-lighting.jpg",
    readTime: "3 min read",
    views: "2.1k",
  },
  {
    title: "Layered Lighting Design",
    description: "Combine ambient, task, and accent lighting for perfect illumination",
    image: "/assets/images/layered-lighting.png",
    trend: "Rising",
    readTime: "5 min read",
    views: "1.8k",
  },
  {
    title: "Sustainable LED Solutions",
    description: "Energy-efficient lighting that's beautiful and environmentally friendly",
    image: "/assets/images/sustainable-led-lighting.jpg",
    trend: "New",
    readTime: "4 min read",
    views: "1.2k",
  },
]

export function TrendingIdeas() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <TrendingUp className="w-6 h-6 text-teal-600" />
            <span className="text-teal-600 font-semibold uppercase tracking-wide text-sm">What&apos;s Trending</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Latest Lighting Ideas</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay ahead with the newest trends and innovations in home lighting
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {trendingIdeas.map((idea, index) => (
            <article key={index} className="group cursor-pointer">
              <div className="relative h-64 rounded-xl overflow-hidden mb-6">
                <Image
                  src={idea.image || "/placeholder.svg"}
                  alt={idea.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-teal-600 transition-colors duration-300">
                  {idea.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{idea.description}</p>

                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {idea.readTime}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {idea.views} views
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
