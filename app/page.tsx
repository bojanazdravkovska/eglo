import { HeroSection } from "../components/HeroSection"
import { CategoryGrid } from "../components/CategoryGrid"
import { FeaturedProducts } from "../components/FeaturedProducts"
import { CTASection } from "../components/CtaSection"
import { StyleGrid } from "../components/StyleGrid"
import { AdminPanel } from "../components/AdminPanel"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
     
      <HeroSection />
      <AdminPanel />
      <CategoryGrid />
      <StyleGrid />
      <FeaturedProducts />
      <CTASection />
    
    </div>
  )
}
