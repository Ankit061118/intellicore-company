import { ArrowUpRight, Check } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ScrollReveal from '../ScrollReveal.jsx'

function ServiceDetailSection({ service, index }) {
  const Icon = service.icon
  const isReversed = index % 2 === 1
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className={`service-detail service-detail--${service.number}${isReversed ? ' is-reversed' : ''}`} id={service.slug} aria-labelledby={`${service.slug}-title`}>
      <div className="services-container service-detail__layout">
        <ScrollReveal className="service-detail__copy">
          <p className="service-detail__eyebrow"><span>{service.number}</span> / SERVICE AREA</p>
          <div className="service-detail__title-row">
            <span className="service-detail__icon"><Icon size={22} aria-hidden="true" /></span>
            <h2 id={`${service.slug}-title`}>{service.title}</h2>
          </div>
          <p className="service-detail__intro">{service.description}</p>
          <ul className="service-detail__features">
            {service.features.map((feature) => <li key={feature}><Check size={15} aria-hidden="true" />{feature}</li>)}
          </ul>
          <div className="service-detail__technologies">
            <p>TECHNOLOGIES & TOOLS</p>
            <ul>{service.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>
          </div>
          <Link className="service-detail__link" to="/contact">Talk about {service.title.toLowerCase()} <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </ScrollReveal>

        <ScrollReveal className="service-detail__visual-wrap" delay={0.1}>
          <motion.div className="service-detail__visual" whileHover={prefersReducedMotion ? undefined : { y: -4 }} transition={{ duration: prefersReducedMotion ? 0 : 0.2, ease: 'easeOut' }}>
            <div className="service-detail__visual-top"><span><i /> NEXORA / {service.number}</span><span>LIVE SYSTEM</span></div>
            <div className="service-detail__visual-orbit" aria-hidden="true"><div /><div /><span><Icon size={29} /></span></div>
            <div className="service-detail__visual-caption"><span>{service.visualLabel}</span><ArrowUpRight size={15} aria-hidden="true" /></div>
            <div className="service-detail__visual-lines" aria-hidden="true"><i /><i /><i /><i /></div>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default ServiceDetailSection