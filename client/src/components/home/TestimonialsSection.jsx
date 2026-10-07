import { Quote } from 'lucide-react'
import { clientPerspectives } from '../../data/homeContent.js'
import SectionHeading from '../SectionHeading.jsx'
import ScrollReveal, { StaggerGroup, StaggerItem } from '../ScrollReveal.jsx'

function TestimonialsSection() {
  return (
    <section className="home-section home-testimonials" id="perspectives">
      <div className="home-container">
        <ScrollReveal className="home-section__heading">
          <SectionHeading eyebrow="Client perspectives" title="The best work feels like a shared effort." description="Illustrative sample quotes are shown here until approved client feedback is available." />
        </ScrollReveal>
        <StaggerGroup className="home-testimonial-grid" delay={0.02}>
          {clientPerspectives.map((perspective) => (
            <StaggerItem key={perspective.role}>
              <figure className="home-testimonial">
                <div className="home-testimonial__top"><Quote size={19} aria-hidden="true" /><span>{perspective.label}</span></div>
                <blockquote>{perspective.quote}</blockquote>
                <figcaption><span className="home-testimonial__avatar">N</span><span>{perspective.role}<small>Sample copy · replace before publishing</small></span></figcaption>
              </figure>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}

export default TestimonialsSection