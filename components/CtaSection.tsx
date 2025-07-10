import { Button } from  "./Button"

export function CTASection() {
  return (
    <section className="py-16 px-4 bg-gradient-to-r from-teal-600 to-teal-700">
      <div className="max-w-4xl mx-auto text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Need Help Choosing the Perfect Lighting?</h2>
        <p className="text-xl mb-8 text-teal-100">
          Our lighting experts are here to help you create the perfect ambiance for your space
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-white text-teal-600 hover:bg-gray-100 px-8 py-4 text-lg">
            Free Consultation
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-teal-600 px-8 py-4 text-lg bg-transparent"
          >
            Browse Catalog
          </Button>
        </div>
      </div>
    </section>
  )
}
