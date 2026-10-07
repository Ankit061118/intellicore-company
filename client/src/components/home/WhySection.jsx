import { ArrowUpRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { homePrinciples } from '../../data/homeContent.js'
import SectionHeading from '../SectionHeading.jsx'
import ScrollReveal, { StaggerGroup, StaggerItem } from '../ScrollReveal.jsx'

function WhySection() {
  return (
    <section className="home-section home-why" id="why-nexora">
      <div className="home-container home-why__layout">
        <ScrollReveal className="home-why__intro">
          <SectionHeading eyebrow="Why Nexora" title="Good technology starts with better questions." description="We bring a clear point of view, a close-knit team, and a practical bias for making progress." />
          <Link className="home-text-link" to="/about">Get to know us <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </ScrollReveal>
        <StaggerGroup className="home-principles" delay={0.02}>
          {homePrinciples.map((principle) => (
            <StaggerItem key={principle.number}>
              <article className="home-principle">
                <span className="home-principle__number">{principle.number}</span>
                <div><h3>{principle.title}</h3><p>{principle.description}</p></div>
                <Check size={17} aria-hidden="true" />
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}

export default WhySection