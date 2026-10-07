import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'

const MotionLink = motion.create(Link)
const cardVariants = {
  rest: { y: 0, scale: 1 },
  hover: { y: -4, scale: 1.006, transition: { type: 'spring', stiffness: 380, damping: 30 } },
}
const imageVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.045, transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] } },
}

function ProjectCard({ slug, title, category, description, image, imageAlt = '', technologies = [], featured = false, actionLabel = 'Explore project', className = '' }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <MotionLink
      className={`project-card ${className}`.trim()}
      to={slug ? `/projects/${slug}` : '/projects'}
      initial="rest"
      animate="rest"
      whileHover={prefersReducedMotion ? undefined : 'hover'}
      whileFocus={prefersReducedMotion ? undefined : 'hover'}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.992 }}
      variants={cardVariants}
    >
      <div className="project-card__visual">
        {image ? <motion.img src={image} alt={imageAlt || `${title} project preview`} loading="lazy" variants={imageVariants} /> : <span aria-hidden="true">{title?.slice(0, 1) || 'N'}</span>}
        {featured && <span className="project-card__featured">Featured</span>}
        <span className="project-card__overlay"><span>{actionLabel}</span><ArrowUpRight size={17} aria-hidden="true" /></span>
      </div>
      <div className="project-card__body">
        {category && <p className="project-card__category">{category}</p>}
        <h3>{title}</h3>
        {description && <p className="project-card__description">{description}</p>}
        {technologies.length > 0 && (
          <ul className="project-card__technologies" aria-label="Technologies">
            {technologies.map((technology) => <li key={technology}>{technology}</li>)}
          </ul>
        )}
      </div>
    </MotionLink>
  )
}

export default ProjectCard