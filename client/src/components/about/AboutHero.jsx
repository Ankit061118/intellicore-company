import { ArrowDown, ArrowUpRight, Orbit } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { aboutHeroSignals } from '../../data/aboutContent.js'
import Button from '../Button.jsx'

const title = 'People first. Systems that move forward.'

function AboutHero() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="about-hero" aria-labelledby="about-title">
      <div className="about-hero__glow" aria-hidden="true" />
      <div className="about-hero__grid" aria-hidden="true" />
      <div className="about-container about-hero__layout">
        <div className="about-hero__copy">
          <motion.p className="home-eyebrow" initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.42 }}>
            <span className="home-eyebrow__signal" /> Nexora Labs <span>/</span> About us
          </motion.p>
          <motion.h1
            id="about-title"
            aria-label={title}
            initial={reduceMotion ? false : 'hidden'}
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.055, delayChildren: reduceMotion ? 0 : 0.08 } } }}
          >
            {title.split(' ').map((word, index) => (
              <motion.span key={`${word}-${index}`} className="about-hero__word" aria-hidden="true" variants={{ hidden: { opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 9 }, visible: { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0 : 0.44 } } }}>
                {word}
              </motion.span>
            ))}
          </motion.h1>
          <p className="about-hero__description">We bring clear thinking and considered technology together to make ambitious ideas work in the real world.</p>
          <div className="about-hero__actions">
            <Button href="#company-story">Our story <ArrowDown size={15} aria-hidden="true" /></Button>
            <Button to="/contact" variant="secondary">Meet us in a conversation <ArrowUpRight size={15} aria-hidden="true" /></Button>
          </div>
          <div className="about-hero__signals" role="group" aria-label="How we work">
            {aboutHeroSignals.map((signal) => <div key={signal.value}><span>{signal.value}</span><p>{signal.label}</p></div>)}
          </div>
        </div>
        <motion.div className="about-hero__visual" initial={reduceMotion ? false : { opacity: 0, scale: 0.975 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: reduceMotion ? 0 : 0.62, delay: reduceMotion ? 0 : 0.16 }} aria-hidden="true">
          <div className="about-hero__visual-grid" />
          <motion.div className="about-hero__orbit about-hero__orbit--one" animate={reduceMotion ? undefined : { rotate: 360 }} transition={{ duration: 54, repeat: Infinity, ease: 'linear' }} />
          <motion.div className="about-hero__orbit about-hero__orbit--two" animate={reduceMotion ? undefined : { rotate: -360 }} transition={{ duration: 72, repeat: Infinity, ease: 'linear' }} />
          <div className="about-hero__core"><Orbit size={44} strokeWidth={1.2} /></div>
          <span className="about-hero__orb about-hero__orb--a" />
          <span className="about-hero__orb about-hero__orb--b" />
          <div className="about-hero__visual-label"><span>NX / COLLECTIVE INTELLIGENCE</span><span>HUMAN + SYSTEM</span></div>
        </motion.div>
      </div>
      <a className="about-hero__scroll" href="#company-story" aria-label="Scroll to company story"><span>Scroll to discover</span><ArrowDown size={14} aria-hidden="true" /></a>
    </section>
  )
}

export default AboutHero