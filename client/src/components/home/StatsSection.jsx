import { useEffect, useRef } from 'react'
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from 'framer-motion'
import { homeStats } from '../../data/homeContent.js'

function AnimatedStat({ value, suffix, label, index }) {
  const counterRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()
  const counter = useMotionValue(prefersReducedMotion || document.visibilityState === 'hidden' ? value : 0)
  const formattedValue = useTransform(counter, (current) => Math.round(current).toLocaleString())
  const isInView = useInView(counterRef, { once: true, amount: 0.6 })

  useEffect(() => {
    const documentIsHidden = document.visibilityState === 'hidden'
    if (prefersReducedMotion || documentIsHidden) {
      counter.set(value)
      return undefined
    }
    if (!isInView) return undefined
    const controls = animate(counter, value, { duration: 1.35, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 })
    return () => controls.stop()
  }, [counter, index, isInView, prefersReducedMotion, value])

  return (
    <div className="home-stat" ref={counterRef}>
      <div className="home-stat__value"><motion.span>{formattedValue}</motion.span><span>{suffix}</span></div>
      <p>{label}</p>
    </div>
  )
}

function StatsSection() {
  return (
    <section className="home-stats" id="home-stats" aria-label="Nexora Labs at a glance">
      <div className="home-container home-stats__inner">
        <p className="home-stats__intro">A little context<span> / </span> measurable momentum</p>
        <div className="home-stats__grid">
          {homeStats.map((stat, index) => <AnimatedStat key={stat.label} {...stat} index={index} />)}
        </div>
      </div>
    </section>
  )
}

export default StatsSection