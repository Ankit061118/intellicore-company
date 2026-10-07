import { motion, useReducedMotion } from 'framer-motion'
import { illustrativeTimeline } from '../../data/aboutContent.js'
import ScrollReveal from '../ScrollReveal.jsx'
import SectionHeading from '../SectionHeading.jsx'

function CompanyTimelineSection() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="about-section about-timeline" id="company-timeline">
      <div className="about-container">
        <div className="about-section__heading about-section__heading--row">
          <ScrollReveal>
            <SectionHeading eyebrow="Company timeline" title="A journey shaped by forward motion." description="The way we move from a first question to a system ready for what comes next." />
          </ScrollReveal>
          <span className="about-sample-note">Illustrative journey</span>
        </div>
        <div className="about-timeline__track">
          <motion.div className="about-timeline__rail" initial={prefersReducedMotion ? false : { scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, amount: 0.45 }} transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }} aria-hidden="true" />
          {illustrativeTimeline.map((milestone, index) => (
            <ScrollReveal key={milestone.number} delay={index * 0.07}>
              <article className="about-timeline__item">
                <div className="about-timeline__marker"><span>{milestone.number}</span></div>
                <p>{milestone.phase}</p>
                <h3>{milestone.title}</h3>
                <span className="about-timeline__description">{milestone.description}</span>
              </article>
            </ScrollReveal>
          ))}
        </div>
        <p className="about-timeline__note">Illustrative narrative, not a dated company history. Replace with verified Nexora Labs milestones.</p>
      </div>
    </section>
  )
}

export default CompanyTimelineSection