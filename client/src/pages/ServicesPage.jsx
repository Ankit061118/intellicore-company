import { ArrowDown } from 'lucide-react'
import useDocumentTitle from '../hooks/useDocumentTitle.js'
import { detailedServices } from '../data/services.js'
import ServiceCard from '../components/ServiceCard.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import ScrollReveal from '../components/ScrollReveal.jsx'
import ServiceDetailSection from '../components/services/ServiceDetailSection.jsx'
import ServiceBenefitsSection from '../components/services/ServiceBenefitsSection.jsx'
import ProcessSection from '../components/home/ProcessSection.jsx'
import CTASection from '../components/home/CTASection.jsx'
import './ServicesPage.css'

function ServicesPage() {
  useDocumentTitle(
    'Digital Product, AI & Software Services',
    'Explore Nexora Labs services in web and mobile development, product design, cloud engineering, AI automation, and custom software.',
  )

  return (
    <div className="services-page">
      <section className="services-hero" aria-labelledby="services-title">
        <div className="services-hero__glow" aria-hidden="true" />
        <div className="services-container services-hero__inner">
          <ScrollReveal className="services-hero__copy">
            <SectionHeading
              eyebrow="What we do / Nexora capabilities"
              title="The right expertise to move your ideas forward."
              description="From the first sketch to the systems behind it, bring the right people and disciplines around the work that matters."
              titleId="services-title"
              headingLevel={1}
            />
            <a className="services-hero__scroll" href="#service-list">Explore capabilities <ArrowDown size={15} aria-hidden="true" /></a>
          </ScrollReveal>
          <div className="services-hero__index" aria-hidden="true"><span>CAPABILITIES</span><strong>01—06</strong><i /></div>
        </div>
      </section>

      <section className="services-list" id="service-list" aria-labelledby="service-list-title">
        <div className="services-container">
          <div className="services-list__heading">
            <div><p className="services-kicker">One connected practice</p><h2 id="service-list-title">Services built around your next move.</h2></div>
            <p>Bring us one challenge or a bigger ambition. We shape the team and approach around what will make the difference.</p>
          </div>
          <div className="services-grid">
            {detailedServices.map((service, index) => (
              <ScrollReveal key={service.number} delay={index * 0.045}>
                <ServiceCard {...service} to={`/services#${service.slug}`} className="detailed-service-card" />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      <section className="service-details" aria-label="Detailed service capabilities">
        {detailedServices.map((service, index) => <ServiceDetailSection key={service.slug} service={service} index={index} />)}
      </section>
      <ServiceBenefitsSection />
      <ProcessSection />
      <CTASection />
    </div>
  )
}

export default ServicesPage