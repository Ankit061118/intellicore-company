import { ArrowUpRight } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ScrollReveal from '../ScrollReveal.jsx'

const MotionLink = motion.create(Link)

function CTASection() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="home-cta" id="start-a-project">
      <div className="home-cta__grid" aria-hidden="true" />
      <ScrollReveal className="home-container home-cta__inner">
        <div>
          <p className="home-eyebrow"><span className="home-eyebrow__signal" /> Your next chapter starts here</p>
          <h2>Have something meaningful to move forward?</h2>
          <p>Bring us the hard question. We&apos;ll help you find the right next step.</p>
        </div>
        <MotionLink
          className="home-cta__button"
          to="/contact"
          whileHover={prefersReducedMotion ? undefined : { y: -3 }}
          whileFocus={prefersReducedMotion ? undefined : { y: -2 }}
          whileTap={prefersReducedMotion ? undefined : { scale: 0.985 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.17 }}
        >
          Let&apos;s work together <ArrowUpRight size={18} aria-hidden="true" />
        </MotionLink>
      </ScrollReveal>
    </section>
  )
}

export default CTASection