import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { homeServices } from '../../data/homeContent.js'
import SectionHeading from '../SectionHeading.jsx'
import ServiceCard from '../ServiceCard.jsx'
import ScrollReveal, { StaggerGroup, StaggerItem } from '../ScrollReveal.jsx'

function ServicesSection() {
  return (
    <section className="home-section home-services" id="services">
      <div className="home-container">
        <ScrollReveal className="home-section__heading">
          <SectionHeading eyebrow="What we do" title="The right capabilities. Working as one." description="We connect the pieces that make digital products feel clear, considered, and genuinely useful." />
          <Link className="home-text-link" to="/services">Explore our services <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </ScrollReveal>
        <StaggerGroup className="home-service-grid" delay={0.02}>
          {homeServices.map((service) => (
            <StaggerItem key={service.number}>
              <ServiceCard {...service} className="home-service-card" />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}

export default ServicesSection