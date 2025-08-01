import Image from 'next/image';
import Link from 'next/link';

const summary = `EGLO’s development has been and continues to be rapid: from the number of employees, through sales development, to production facilities and sales companies around the globe: These growth rates exceed the market, to ensure that EGLO will continue to grow healthily in the future, business development is driven with great sustainability. We retain what is tried and tested and leave room to let our principles grow along with us.`;

const principles = [
  {
    letter: 'E',
    word: 'stablished',
    title: 'Preserving and developing what has proven its value',
    description: `Our numbers have almost doubled in 10 years (from 2007 to 2017). The number of companies in the EGLO Sales Group has increased fivefold in 20 years (1997 to 2017).\n\nThe first secret of success is the fact that EGLO is still a family-owned business and can therefore operate independently. Control over development, production and logistics was also a success factor from the beginning. We learn every day and invest in our customers, our partners, our employees, our products and our service all over the world.`,
    image: '/assets/images/first.jpg',
  },
  {
    letter: 'G',
    word: 'lobal',
    title: 'Global & local',
    description: `Around 70 EGLO companies are responsible for sales, service and, in some cases, regional marketing in more than 50 countries around the world. Despite the progress of internationalization and globalization, we are, and remain, a family company with Tyrolean roots.\n\nThink globally - act locally is becoming more and more "Ask locally - act globally" as networks and regional needs grow. Customers belong to a regional culture and have different needs, even if they operate and buy all over the world. To unite and reconcile these two worlds is one of our highest aspirations.`,
    image: '/assets/images/second.jpg',
  },
  {
    letter: 'L',
    word: 'ight',
    title: 'Light that inspires the masses',
    description: `Almost every two hours, a new product is developed at EGLO. That's an average of almost four new products per working day.\n\nLast year alone, more than 900 new products were developed and launched on the market. The current product range includes more than 4,000 items. Every day we produce 80,000 luminaires worldwide.\n\nEven for us, these figures are always impressive. However, there is much more to the understanding of people and lights. It takes excellent antennas, the ability to listen and the vision to understand what customers want to see and experience in their homes in the future. You can only become a trendsetter by setting the direction yourself. We constantly monitor developments in light, living and life, absorb creative impulses from various fields and examine trends according to their potential.`,
    image: '/assets/images/third.jpg',
  },
  {
    letter: 'O',
    word: 'rganization',
    title: 'Strong together',
    description: `EGLO's rapid growth has always been a challenge for our organization. Our regional-global understanding and the fact that EGLO is still, and will remain, family-owned help us to meet this challenge. For us, size is only a strength if things work on a small scale. For this reason, location is essential: for our customers, our partners and our employees. Only in perfectly organized and well-connected units can we manage and develop 4,700 employees worldwide.\n\nAnother interesting aspect of our organizations' philosophy refers to the ongoing support of our partners. We constantly consider our employees, not just the customer: "What is needed and what can we offer? Where is our experience needed? What do our employees expect and what are our requirements?" We want to understand and find a common path to success. In this way, partnerships are created that will be preserved for decades. This culture is not only part of our organization, but our personal statement to everyone who works with us.`,
    image: '/assets/images/fourth.jpg',
  },
];

export default function PrinciplesPage() {
  return (
    <div className="max-w-5xl mx-auto pb-16">
      {/* Breadcrumbs */}
      <div className="border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-teal-600 transition-colors">Home page</Link>
            <span>/</span>
            <span className="text-gray-900">Our principles</span>
          </nav>
        </div>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold mt-6 mb-4 text-left px-4 text-gray-800">Our principles</h1>
      <div className="flex flex-col md:flex-row gap-4 px-4 mb-8">
        <div className="flex-1 flex flex-col gap-4">
          <div className="bg-teal-500 text-white rounded-lg p-6 text-2xl font-semibold max-w-xs text-left">The pillars of our thought process</div>
        </div>
        <div className="flex-[2]">
          <div className="bg-teal-100 text-teal-900 rounded-lg p-6 text-base font-medium shadow-sm">
            {summary}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-10 px-4">
        {principles.map((p, idx) => (
          <div key={idx} className="flex flex-col md:flex-row items-start gap-8 w-full">
            {/* Left column: big letter + word side by side */}
            <div className="flex flex-row items-center min-w-[120px] md:min-w-[160px] mb-2 md:mb-0">
              <span className="text-teal-500 text-6xl md:text-7xl font-bold leading-none">{p.letter}</span>
              <span className="text-teal-500 text-2xl md:text-3xl font-semibold ml-2">{p.word}</span>
            </div>
            {/* Right column: text and image */}
            <div className="flex-1 flex flex-col gap-2">
              <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                <div className="text-lg md:text-xl font-semibold text-gray-800 mb-2">{p.title}</div>
                <div className="text-gray-700 whitespace-pre-line text-base md:text-lg">{p.description}</div>
              </div>
              <div className="flex justify-start w-full mt-2">
                <div className="relative w-full max-w-md h-40 md:h-56 rounded-lg overflow-hidden shadow border border-gray-100 bg-white">
                  <Image src={p.image} alt={p.title} fill style={{objectFit:'cover'}} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
