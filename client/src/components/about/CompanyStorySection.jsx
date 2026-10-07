import { ArrowUpRight } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ScrollReveal from '../ScrollReveal.jsx'
import SectionHeading from '../SectionHeading.jsx'

function CompanyStorySection() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="about-section about-story" id="company-story">
      <div className="about-container about-story__layout">
        <ScrollReveal className="about-story__visual">
          <motion.img src="/images/studio-collaboration.jpg" alt="A small team collaborating around laptops in a working studio" loading="lazy" whileHover={prefersReducedMotion ? undefined : { scale: 1.035 }} transition={{ duration: prefersReducedMotion ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] }} />
          <div className="about-story__image-shade" />
          <div className="about-story__image-caption"><span className="about-live-dot" /> A collaborative by design</div>
          <div className="about-story__image-index">NEXORA / 001</div>
        </ScrollReveal>
        <ScrollReveal className="about-story__copy" delay={0.1}>
          <SectionHeading eyebrow="Company story" title="Complexity is easier to move through together." />
          <p>Good work begins when different perspectives meet. We bring strategy, design, and engineering into the same conversation early, so the important questions shape the solution from the start.</p>
          <p>That means fewer hand-offs, clearer decisions, and digital systems made for the people who rely on them every day.</p>
          <Link className="home-text-link" to="/services">How we put it into practice <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default CompanyStorySection