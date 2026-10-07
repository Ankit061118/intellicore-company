import { ArrowUpRight } from 'lucide-react'
import { illustrativeTeam } from '../../data/aboutContent.js'
import ScrollReveal from '../ScrollReveal.jsx'
import SectionHeading from '../SectionHeading.jsx'

function TeamSection() {
  return (
    <section className="about-section about-team" id="team">
      <div className="about-container">
        <div className="about-section__heading about-section__heading--row">
          <ScrollReveal>
            <SectionHeading eyebrow="The people behind the work" title="Different minds. One shared direction." description="Strategy, design, and engineering are strongest when they work side by side." />
          </ScrollReveal>
          <span className="about-sample-note">Illustrative team profiles</span>
        </div>
        <div className="about-team__grid">
          {illustrativeTeam.map((person, index) => (
            <ScrollReveal key={person.role} delay={index * 0.07}>
              <article className="about-team-card">
                <div className="about-team-card__image-wrap">
                  <img src={person.image} alt={person.imageAlt} loading="lazy" />
                  <span className="about-team-card__index">N / 0{index + 1}</span>
                  <span className="about-team-card__arrow"><ArrowUpRight size={17} aria-hidden="true" /></span>
                  <span className="about-team-card__reveal">Illustrative profile</span>
                </div>
                <div className="about-team-card__body"><p>Discipline {String(index + 1).padStart(2, '0')}</p><h3>{person.role}</h3></div>
              </article>
            </ScrollReveal>
          ))}
        </div>
        <p className="about-team__disclaimer">Portraits and role labels are illustrative placeholders, not Nexora Labs employee profiles.</p>
      </div>
    </section>
  )
}

export default TeamSection