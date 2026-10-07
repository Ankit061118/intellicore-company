import { ArrowUpRight } from 'lucide-react'
import { serviceBenefits } from '../../data/services.js'
import ScrollReveal from '../ScrollReveal.jsx'

function ServiceBenefitsSection() {
  return (
    <section className="services-benefits" aria-labelledby="services-benefits-title">
      <div className="services-container">
        <ScrollReveal className="services-benefits__heading">
          <p className="services-kicker">The Nexora difference</p>
          <h2 id="services-benefits-title">Good outcomes come from how the work gets done.</h2>
        </ScrollReveal>
        <div className="services-benefits__grid">
          {serviceBenefits.map((benefit, index) => (
            <ScrollReveal key={benefit.number} delay={index * 0.06}>
              <article className="services-benefit">
                <span>{benefit.number}</span>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
                <ArrowUpRight size={16} aria-hidden="true" />
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServiceBenefitsSection