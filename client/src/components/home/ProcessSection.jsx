import { projectProcess } from '../../data/homeContent.js'
import { motion, useReducedMotion } from 'framer-motion'
import SectionHeading from '../SectionHeading.jsx'
import ScrollReveal from '../ScrollReveal.jsx'

function ProcessSection() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="home-section home-process" id="process">
      <div className="home-container">
        <ScrollReveal className="home-section__heading">
          <SectionHeading eyebrow="How we work" title="A clear path from first question to forward motion." description="A collaborative process that stays flexible without losing its direction." />
        </ScrollReveal>
        <div className="home-process__timeline">
          <motion.div className="home-process__rail" initial={prefersReducedMotion ? false : { scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }} aria-hidden="true" />
          {projectProcess.map((step, index) => (
            <ScrollReveal key={step.number} delay={index * 0.06}>
              <article className="home-process__step">
                <div className="home-process__marker"><span>{step.number}</span></div>
                <p className="home-process__phase">{step.duration}</p>
                <h3>{step.title}</h3>
                <p className="home-process__description">{step.description}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProcessSection