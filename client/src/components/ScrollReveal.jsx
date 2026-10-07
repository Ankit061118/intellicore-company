import { motion, useReducedMotion } from 'framer-motion'

function ScrollReveal({ children, className, delay = 0, ...props }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.42, delay: prefersReducedMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function StaggerGroup({ children, className, delay = 0, ...props }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={prefersReducedMotion ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.14 }}
      variants={{
        hidden: {},
        visible: { transition: { delayChildren: prefersReducedMotion ? 0 : delay, staggerChildren: prefersReducedMotion ? 0 : 0.07 } },
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className, ...props }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: prefersReducedMotion ? 0 : 0.36, ease: [0.22, 1, 0.36, 1] } },
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default ScrollReveal