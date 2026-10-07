import useDocumentTitle from '../hooks/useDocumentTitle.js'
import CTASection from '../components/home/CTASection.jsx'
import FeaturedProjectsSection from '../components/home/FeaturedProjectsSection.jsx'
import HeroSection from '../components/home/HeroSection.jsx'
import ProcessSection from '../components/home/ProcessSection.jsx'
import ServicesSection from '../components/home/ServicesSection.jsx'
import StatsSection from '../components/home/StatsSection.jsx'
import TestimonialsSection from '../components/home/TestimonialsSection.jsx'
import WhySection from '../components/home/WhySection.jsx'
import './HomePage.css'

function HomePage() {
  useDocumentTitle(
    'Digital Product & AI Studio',
    'Nexora Labs brings strategy, design, and technology together to build useful digital products and intelligent systems.',
  )

  return (
    <div className="home-page">
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <WhySection />
      <FeaturedProjectsSection />
      <ProcessSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  )
}

export default HomePage