import { Crosshair, Telescope } from 'lucide-react'
import ScrollReveal from '../ScrollReveal.jsx'

const statements = [
  {
    id: 'mission',
    label: 'Our mission',
    title: 'Make complex ideas useful to people.',
    description: 'Turn the hard, tangled challenges into digital products and systems that create clarity and meaningful progress.',
    icon: Crosshair,
  },
  {
    id: 'vision',
    label: 'Our vision',
    title: 'A future where technology feels more human.',
    description: 'Shape a world where capable technology quietly expands what people and organizations can do.',
    icon: Telescope,
  },
]

function MissionVisionSection() {
  return (
    <section className="about-section about-purpose" aria-label="Mission and vision">
      <div className="about-container">
        <div className="about-purpose__grid">
          {statements.map(({ id, label, title, description, icon: Icon }, index) => (
            <ScrollReveal key={id} delay={index * 0.1}>
              <article className="about-purpose__panel">
                <div className="about-purpose__topline"><span>{label}</span><Icon size={19} aria-hidden="true" /></div>
                <h2>{title}</h2>
                <p>{description}</p>
                <span className="about-purpose__index">0{index + 1} / NEXORA PRINCIPLE</span>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default MissionVisionSection