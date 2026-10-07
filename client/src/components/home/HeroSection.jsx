import { useRef } from 'react'
import { Activity, ArrowDown, ArrowUpRight, Layers3, Sparkles } from 'lucide-react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import Button from '../Button.jsx'

const headline = 'Building Digital Experiences That Move Businesses Forward.'
const words = headline.split(' ')

const titleVariants = {
  hidden: {},
  visible: { transition: { delayChildren: 0.12, staggerChildren: 0.075 } },
}

const wordVariants = {
  hidden: { opacity: 0, y: 9 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] } },
}

function HeroSection() {
  const visualRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const smoothX = useSpring(pointerX, { stiffness: 75, damping: 22, mass: 0.6 })
  const smoothY = useSpring(pointerY, { stiffness: 75, damping: 22, mass: 0.6 })

  function handlePointerMove(event) {
    if (prefersReducedMotion || event.pointerType === 'touch') return
    const bounds = visualRef.current?.getBoundingClientRect()
    if (!bounds) return
    pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 14)
    pointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 14)
  }

  function resetPointer() {
    pointerX.set(0)
    pointerY.set(0)
  }

  return (
    <section className="home-hero" aria-labelledby="home-title">
      <div className="home-hero__atmosphere" aria-hidden="true" />
      <div className="home-hero__grid" aria-hidden="true" />
      <div className="home-hero__inner home-container">
        <div className="home-hero__copy">
          <motion.p className="home-eyebrow" initial={prefersReducedMotion ? false : { opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: prefersReducedMotion ? 0 : 0.42 }}>
            <span className="home-eyebrow__signal" />
            Nexora Labs <span>/</span> Digital systems studio
          </motion.p>
          <motion.h1 id="home-title" aria-label={headline} variants={titleVariants} initial={prefersReducedMotion ? false : 'hidden'} animate="visible">
            {words.map((word, index) => (
              <motion.span key={`${word}-${index}`} className="home-hero__word" aria-hidden="true" variants={prefersReducedMotion ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } } : wordVariants}>
                {word}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p className="home-hero__description" initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: prefersReducedMotion ? 0 : 0.45, delay: prefersReducedMotion ? 0 : 0.42 }}>
            We bring strategy, design, and technology together to make complex ideas feel clear, useful, and ready for what&apos;s next.
          </motion.p>
          <motion.div className="home-hero__actions" initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: prefersReducedMotion ? 0 : 0.42, delay: prefersReducedMotion ? 0 : 0.55 }}>
            <Button to="/projects">Explore Our Work <ArrowUpRight size={16} aria-hidden="true" /></Button>
            <Button to="/contact" variant="secondary">Let&apos;s Work Together <ArrowUpRight size={16} aria-hidden="true" /></Button>
          </motion.div>
          <motion.div className="home-hero__footnote" initial={prefersReducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: prefersReducedMotion ? 0 : 0.35, delay: prefersReducedMotion ? 0 : 0.65 }}>
            <span>Strategy</span><i /><span>Experience</span><i /><span>Engineering</span>
          </motion.div>
        </div>

        <div className="home-hero__visual-wrap" ref={visualRef} onPointerMove={handlePointerMove} onPointerLeave={resetPointer}>
          <motion.div className="hero-visual" style={prefersReducedMotion ? undefined : { x: smoothX, y: smoothY }}>
            <img className="hero-visual__image" src="/images/circuit-board.jpg" alt="Macro view of a circuit board with finely connected components" fetchPriority="high" />
            <div className="hero-visual__shade" />
            <motion.div className="hero-visual__halo" animate={prefersReducedMotion ? undefined : { rotate: 360 }} transition={{ duration: 42, ease: 'linear', repeat: Infinity }} aria-hidden="true" />
            <div className="hero-visual__topline">
              <span><span className="hero-visual__live-dot" /> NEXORA / SYSTEMS</span>
              <span>01 — 04</span>
            </div>
            <div className="hero-visual__readout">
              <div className="hero-visual__readout-icon"><Layers3 size={17} aria-hidden="true" /></div>
              <div><span>Connected intelligence</span><strong>Make complexity useful.</strong></div>
              <ArrowUpRight size={17} aria-hidden="true" />
            </div>
            <motion.div className="hero-float hero-float--signal" initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }} animate={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: [0, -6, 0] }} transition={prefersReducedMotion ? { duration: 0 } : { y: { duration: 4.8, repeat: Infinity, ease: 'easeInOut' }, opacity: { duration: 0.35, delay: 0.55 } }}>
              <Activity size={15} aria-hidden="true" /><span>Systems in sync</span><i />
            </motion.div>
            <motion.div className="hero-float hero-float--insight" initial={prefersReducedMotion ? false : { opacity: 0, y: -8 }} animate={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: [0, 5, 0] }} transition={prefersReducedMotion ? { duration: 0 } : { y: { duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 0.25 }, opacity: { duration: 0.35, delay: 0.68 } }}>
              <Sparkles size={15} aria-hidden="true" /><span>Built around people</span>
            </motion.div>
            <span className="hero-visual__index">N° 01 <span>Clarity creates momentum</span></span>
          </motion.div>
        </div>
      </div>
      <a className="home-hero__scroll" href="#home-stats" aria-label="Scroll to company stats">
        <span>Scroll to explore</span><ArrowDown size={15} aria-hidden="true" />
      </a>
    </section>
  )
}

export default HeroSection