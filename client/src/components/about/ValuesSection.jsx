import { aboutValues } from '../../data/aboutContent.js'
import ScrollReveal from '../ScrollReveal.jsx'
import SectionHeading from '../SectionHeading.jsx'

function ValuesSection() {
  return (
    <section className="about-section about-values" id="core-values">
      <div className="about-container">
        <ScrollReveal className="about-section__heading">
          <SectionHeading eyebrow="Core values" title="Principles that show up in the work." description="Not words on a wall. A way to make the everyday decisions that shape a better outcome." />
        </ScrollReveal>
        <div className="about-values__grid">
          {aboutValues.map(({ number, title, description, icon: Icon }, index) => (
            <ScrollReveal key={number} delay={index * 0.06}>
              <article className="about-value">
                <div className="about-value__top"><span>{number}</span><Icon size={21} aria-hidden="true" /></div>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ValuesSection