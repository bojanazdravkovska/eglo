import Image from "next/image";

const milestones = [
  {
    year: "1969",
    title: "Company Founded",
    description:
      "EGLO is established, laying the foundation for decades of lighting innovation and growth. Determination, perseverance, and continuous development have been the cornerstones since the very beginning. Founder Ludwig Obwieser set the tone for a success story that continues to this day.",
    image: null,
  },
  {
    year: "1976",
    title: "First Company Building in Austria",
    description:
      "The first EGLO company building is completed in Pill, Austria, marking a significant step in the company's expansion.",
    image: "/assets/images/Eglo1976.jpg",
  },
  {
    year: "1986",
    title: "Globalization Begins",
    description:
      "EGLO takes its first step towards internationalization with the establishment of a sales company in Germany. This marks the beginning of EGLO's journey to becoming a global brand, now present in over 70 countries.",
    image: null,
  },
  {
    year: "2016",
    title: "Company Building in Germany",
    description:
      "A new, modern company building opens in Arnsberg, Germany, reflecting EGLO's commitment to innovation and growth in the European market.",
    image: "/assets/images/eglo-arnsberg.jpg",
  },
  {
    year: "1994",
    title: "First Plant in Hungary",
    description:
      "EGLO's first plant is built in Pásztó, Hungary. The site grows continuously and now includes a 4-story production hall with 14,000 m² and a fully automated warehouse.",
    image: "/assets/images/Ungarn.jpg",
  },
  {
    year: "1997",
    title: "Sustainable Growth",
    description:
      "EGLO invests in central warehouses for fast delivery. In 1997, the storage area exceeds 10,000 m³ for the first time, a trend that continues for the next 20 years, reaching 200,000 m³ by 2017.",
    image: "/assets/images/ueber_eglo_5-lager.jpg",
  },
  {
    year: "2001",
    title: "Production in China",
    description:
      "EGLO begins manufacturing in China. The office and production building covers an area exceeding 120,000 m², employing more than 1,100 people and supporting global growth.",
    image: "/assets/images/EGLOChina.jpg",
  },
  {
    year: "2006",
    title: "LED Technology Embraced",
    description:
      "EGLO launches its first LED products, leading the way in energy-efficient lighting. Today, almost the entire range is made up of long-lasting, energy-saving LED luminaires.",
    image: "/assets/images/ueber_eglo_7-led.jpg",
  },
  {
    year: "2016",
    title: "Smart Lighting Solutions",
    description:
      "EGLO introduces smart lighting, making homes brighter and more connected. The company works on solutions for easy and intelligent control of lighting via smart devices.",
    image: "/assets/images/ueber_eglo_8-smart-light.jpg",
  },
  {
    year: "2017",
    title: "Production in India",
    description:
      "A new factory in India begins operation, supporting EGLO's global supply chain and expanding its manufacturing footprint in Asia.",
    image: "/assets/images/Indien.jpg",
  },
  {
    year: "2019",
    title: "50th Anniversary",
    description:
      "EGLO celebrates 50 years of lighting innovation, with over 70 companies worldwide and more than 80,000 lights produced daily in factories in Hungary, China, and India.",
    image: null,
    video: "https://www.youtube.com/embed/U8fy-uoZp0Y?start=1",
  },
  {
    year: "2021",
    title: "Innovative Logistics Center in Magdeburg",
    description:
      "A new logistics center opens in Magdeburg, Germany, with space for approximately 76,000 pallets and over 150 employees, further enhancing EGLO's European distribution.",
    image: "/assets/images/Magdeburg.jpg",
  },
  {
    year: "2023",
    title: "Opening of EGLO Lichtwelten",
    description:
      "Europe's largest lighting store opens, offering a wide selection of items and exciting visual and auditory impressions. The modern 3-story building features 7,500 m² of exhibition space and 4,600 m² of outdoor space.",
    image: "/assets/images/EGLO-Lichtwelten.jpg",
  },
];

export default function Landmark() {
  return (
    <div className="w-full py-12 md:py-16 lg:py-20">
      <section>
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 mt-2 text-gray-900">Landmark</h2>
          <p className="text-lg text-gray-600 mb-8">Moments that showcase our bright history.</p>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {milestones.map((milestone, idx) => (
              <div
                key={milestone.year + milestone.title}
                className="bg-white rounded-xl shadow-md p-6 flex flex-col items-start hover:shadow-lg transition-shadow duration-200"
              >
                <span className="text-2xl font-semibold text-teal-600 mb-2">{milestone.year}</span>
                <h3 className="text-xl font-bold text-gray-800 mb-1">{milestone.title}</h3>
                <p className="text-gray-600 mb-4">{milestone.description}</p>
                {milestone.image && (
                  <div className="w-full h-40 relative rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={milestone.image}
                      alt={milestone.title}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="transition-transform duration-200 hover:scale-105"
                    />
                  </div>
                )}
                {milestone.video && (
                  <div className="w-full aspect-video mt-2 rounded-lg overflow-hidden bg-black">
                    <iframe
                      src={milestone.video}
                      title="EGLO 50th Anniversary Video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
