import Image from "next/image"
import { Badge } from "./Badge"

const rooms = [
  {
    title: "Living Room",
    subtitle: "Cozy & Inviting",
    image: "/assets/images/livingRoom.jpg",
    description: "Create warmth with layered lighting",
    featured: true,
  },
  {
    title: "Kitchen",
    subtitle: "Functional & Bright",
    image: "/assets/images/kitchen.jpg",
    description: "Perfect task and ambient lighting",
  },
  {
    title: "Bedroom",
    subtitle: "Relaxing & Soft",
    image: "/assets/images/bedroom.webp",
    description: "Gentle illumination for rest",
  },
  {
    title: "Dining Room",
    subtitle: "Elegant & Dramatic",
    image: "/assets/images/diningroom.webp",
    description: "Statement lighting for gatherings",
  },
  {
    title: "Bathroom",
    subtitle: "Clean & Bright",
    image: "/assets/images/bathroom.webp",
    description: "Crisp, even illumination",
  },
]

export function RoomShowcase() {
  return (
    <section className="pb-10 pt-2 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Room by Room</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore how the right lighting transforms every space in your home
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Featured Room - Takes up 2 columns */}
          <div className="lg:col-span-2">
            <div className="group relative h-96 lg:h-[500px] rounded-2xl overflow-hidden cursor-pointer">
              <Image
                src={rooms[0].image || "/placeholder.svg"}
                alt={rooms[0].title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <Badge className="absolute top-6 left-6 bg-teal-600">Featured</Badge>

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-3xl font-bold mb-2">{rooms[0].title}</h3>
                <p className="text-teal-200 font-medium mb-2">{rooms[0].subtitle}</p>
                <p className="text-gray-200">{rooms[0].description}</p>
              </div>
            </div>
          </div>

          {/* Other Rooms */}
          <div className="space-y-6">
            {rooms.slice(1).map((room, index) => (
              <div key={index} className="group relative h-44 rounded-xl overflow-hidden cursor-pointer">
                <Image
                  src={room.image || "/placeholder.svg"}
                  alt={room.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>

                <div className="absolute inset-0 p-4 flex flex-col justify-end text-white">
                  <h4 className="text-lg font-semibold mb-1">{room.title}</h4>
                  <p className="text-sm text-gray-200">{room.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
