import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'

const MotionLink = motion.create(Link)
const cardVariants = {
  rest: { y: 0, scale: 1 },
  hover: { y: -4, scale: 1.006, transition: { type: 'spring', stiffness: 380, damping: 30 } },
}
const arrowVariants = {
  rest: { x: 0, y: 0 },
  hover: { x: 2, y: -2, transition: { duration: 0.16 } },
}

function ServiceCard({ number, title, description, capabilities = [], action = 'Explore service', to = '/services', icon: Icon, className = '' }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <MotionLink
      className={`service-card ${className}`.trim()}
      to={to}
      initial="rest"
      animate="rest"
      whileHover={prefersReducedMotion ? undefined : 'hover'}
      whileFocus={prefersReducedMotion ? undefined : 'hover'}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.992 }}
      variants={cardVariants}
    >
      <div className="service-card__topline">
        {number && <span className="service-card__number">{number}</span>}
        {Icon ? <Icon className="service-card__icon" size={21} aria-hidden="true" /> : <ArrowUpRight className="service-card__icon" size={19} aria-hidden="true" />}
      </div>
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      {capabilities.length > 0 && (
        <ul className="service-card__capabilities">
          {capabilities.map((capability) => <li key={capability}>{capability}</li>)}
        </ul>
      )}
      {action && <span className="service-card__action">{action}<motion.span variants={arrowVariants}><ArrowUpRight size={15} aria-hidden="true" /></motion.span></span>}
    </MotionLink>
  )
}

export default ServiceCard