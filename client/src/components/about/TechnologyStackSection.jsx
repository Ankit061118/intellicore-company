import { ArrowUpRight, Boxes } from 'lucide-react'
import { technologyGroups } from '../../data/aboutContent.js'
import ScrollReveal from '../ScrollReveal.jsx'
import SectionHeading from '../SectionHeading.jsx'

function TechnologyStackSection() {
  return (
    <section className="about-section about-technology" id="technology-stack">
      <div className="about-container about-technology__layout">
        <ScrollReveal className="about-technology__intro">
          <SectionHeading eyebrow="Technology stack" title="Choose the tool for the job. Then make it work beautifully." description="A flexible toolkit across product engineering, applied intelligence, data, and delivery." />
        </ScrollReveal>
        <div className="about-technology__groups">
          {technologyGroups.map((group, index) => (
            <ScrollReveal key={group.name} delay={index * 0.07}>
              <article className="about-tech-group">
                <div className="about-tech-group__heading"><span className="about-tech-group__icon"><Boxes size={17} /></span><h3>{group.name}</h3><ArrowUpRight size={15} aria-hidden="true" /></div>
                <ul>{group.tools.map((tool) => <li key={tool}>{tool}</li>)}</ul>
              </article>
            </ScrollReveal>
          ))}
        </div>
       
      </div>
    </section>
  )
}

export default TechnologyStackSection