import SectionHeading from '../components/SectionHeading.jsx'
import ScrollReveal from '../components/ScrollReveal.jsx'
import useDocumentTitle from '../hooks/useDocumentTitle.js'

function PagePlaceholder({ title, eyebrow = 'Nexora Labs', description }) {
  useDocumentTitle(title)

  return (
    <section className="page-placeholder page-container">
      <div className="page-placeholder__layout">
        <ScrollReveal className="page-placeholder__copy">
          <SectionHeading eyebrow={eyebrow} title={title} description={description} />
          <div className="page-placeholder__meta">
            <span className="status-dot" />
            <span>Research</span><i /><span>Engineering</span><i /><span>Intelligence</span>
          </div>
        </ScrollReveal>
        <ScrollReveal className="page-placeholder__artwork" delay={0.12}>
          <div className="core-visual" aria-hidden="true">
            <div className="core-visual__grid" />
            <div className="core-visual__orbit core-visual__orbit--outer" />
            <div className="core-visual__orbit core-visual__orbit--middle" />
            <div className="core-visual__orbit core-visual__orbit--inner" />
            <div className="core-visual__core"><OrbitMark /></div>
            <span className="core-visual__node core-visual__node--one" />
            <span className="core-visual__node core-visual__node--two" />
            <span className="core-visual__node core-visual__node--three" />
            <div className="core-visual__label"><span>NXR / SYSTEM 01</span><span>INTELLIGENCE, IN MOTION</span></div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

function OrbitMark() {
  return <span className="core-visual__mark">N</span>
}

export default PagePlaceholder