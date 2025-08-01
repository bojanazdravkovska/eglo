import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function AboutEglo() {
  return (
    <section className="w-full bg-white pt-0 pb-12 md:pb-16 lg:pb-20 min-h-screen">
      {/* Breadcrumbs */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-teal-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">About Eglo</span>
          </nav>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-10 items-center mt-8">
        {/* Left: Text blocks */}
        <div className="flex-1 flex flex-col gap-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 mt-2 text-left px-4 text-gray-900">About EGLO</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="bg-teal-600 text-white rounded-lg p-6 text-xl font-semibold flex-1 shadow-md">
              Bright minds have always been fascinated by the subject of light.
            </div>
            <div className="bg-teal-100 text-teal-900 rounded-lg p-6 flex-1 shadow-sm text-base">
              Although the light bulb is credited to have been invented by Thomas Edison, scientists and inventors were already researching the use of electric light in the early 19th century. The first patents for light bulbs were granted in 1841, but Edison enabled their practical use and mass production in 1880.<br/><br/>
              <span className="font-semibold">EGLO</span> has found a place in the history of lighting, growing successfully for over 50 years.
            </div>
          </div>
        </div>
        {/* Right: Image */}
        <div className="flex-1 flex justify-center items-center">
          <div className="rounded-xl overflow-hidden shadow-lg w-full max-w-xl bg-gray-100">
            <Image
              src="/assets/images/headquarters.jpg"
              alt="EGLO headquarters or product"
              width={900}
              height={0} // Let Next.js auto-calculate height
              className="object-cover w-full"
              priority
            />
          </div>
        </div>
      </div>
      {/* Philosophy/Motto Block */}
      <div className="max-w-4xl mx-auto mt-12 px-4">
        <div className="bg-white border-l-4 border-teal-600 p-6 rounded-lg shadow-md">
          <blockquote className="text-xl italic text-gray-700 mb-2">
            &quot;Contemporary design, coupled with high functionality, at affordable prices.&quot;
          </blockquote>
          <div className="text-gray-600 text-base">
            <span className="font-semibold">This has always been and continues to be our motto.</span> In step with the times, we develop and produce products tailored to the needs of our customers. We are currently working intensively on Smart Lighting, bringing light and illumination into a digitally networked and easily controllable form.<br/><br/>
            Whatever the future holds in terms of light, we will continue to deliver contemporary lighting solutions for all walks of life from the Austrian Tyrol to the world.
          </div>
        </div>
      </div>
    </section>
  );
}
