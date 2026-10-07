import { classNames } from '../utils/classNames.js'

function SectionHeading({ eyebrow, title, description, align = 'left', className, titleId, headingLevel = 2 }) {
  const Heading = headingLevel === 1 ? 'h1' : 'h2'

  return (
    <div className={classNames('section-heading', `section-heading--${align}`, className)}>
      {eyebrow && <p className="section-heading__eyebrow">{eyebrow}</p>}
      <Heading id={titleId}>{title}</Heading>
      {description && <p className="section-heading__description">{description}</p>}
    </div>
  )
}

export default SectionHeading