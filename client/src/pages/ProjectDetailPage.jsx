import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowUpRight, Check, RefreshCw } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { api } from '../services/api.js'
import useDocumentTitle from '../hooks/useDocumentTitle.js'
import ScrollReveal from '../components/ScrollReveal.jsx'
import CTASection from '../components/home/CTASection.jsx'
import './ProjectsPage.css'
import './ProjectDetailPage.css'

function ProjectDetailPage() {
  const { slug } = useParams()
  const [requestState, setRequestState] = useState({ key: null, project: null, error: null, loading: true })
  const [retryCount, setRetryCount] = useState(0)
  const requestKey = `${slug}:${retryCount}`
  const requestIsCurrent = requestState.key === requestKey
  const project = requestIsCurrent ? requestState.project : null
  const error = requestIsCurrent ? requestState.error : null
  const loading = !requestIsCurrent || requestState.loading

  useEffect(() => {
    const controller = new AbortController()

    api.projects.getBySlug(slug, { signal: controller.signal })
      .then((loadedProject) => {
        setRequestState({ key: requestKey, project: loadedProject, error: null, loading: false })
      })
      .catch((loadError) => {
        if (loadError.name !== 'AbortError') {
          setRequestState({ key: requestKey, project: null, error: loadError, loading: false })
        }
      })

    return () => controller.abort()
  }, [slug, requestKey])

  const features = Array.isArray(project?.features) ? project.features : project?.highlights || []
  const technologies = Array.isArray(project?.technologies) ? project.technologies : []
  const resultItems = Array.isArray(project?.results) ? project.results : project?.results ? [project.results] : []
  const outcome = project?.outcome || resultItems.join(' · ')
  useDocumentTitle(
    loading ? 'Loading project' : project ? `${project.title} Project` : 'Project not found',
    project?.description || 'Explore a digital product concept from Nexora Labs.',
    {
      image: project?.image || undefined,
      type: project ? 'article' : 'website',
      noIndex: !loading && !project,
    },
  )

  const retry = () => setRetryCount((count) => count + 1)

  if (loading) {
    return (
      <div className="portfolio-page project-detail-page project-detail-skeleton" role="status" aria-label="Loading project">
        <section className="project-detail-hero">
          <div className="portfolio-container project-detail-hero__inner">
            <div className="api-skeleton project-detail-skeleton__back" />
            <div className="project-detail-skeleton__copy">
              <div className="api-skeleton project-detail-skeleton__eyebrow" />
              <div className="api-skeleton project-detail-skeleton__title" />
              <div className="api-skeleton project-detail-skeleton__description" />
              <div className="api-skeleton project-detail-skeleton__description project-detail-skeleton__description--short" />
              <div className="api-skeleton project-detail-skeleton__tags" />
            </div>
            <div className="api-skeleton project-detail-skeleton__media" />
          </div>
        </section>
      </div>
    )
  }

  if (error || !project) {
    const notFound = error?.status === 404
    return (
      <div className="portfolio-container project-not-found">
        <div className="portfolio-empty project-detail-state">
          {notFound && <p className="portfolio-eyebrow"><i /> PROJECT / NOT FOUND</p>}
          <h1>{notFound ? 'That project isn’t in this collection.' : 'Project couldn’t be loaded'}</h1>
          <p role={notFound ? 'status' : 'alert'}>{error?.message || 'The requested project could not be found.'}</p>
          <button type="button" onClick={retry}><RefreshCw size={14} aria-hidden="true" /> Retry</button>
          <Link to="/projects" className="project-back-link"><ArrowLeft size={16} /> Back to all projects</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="portfolio-page project-detail-page">
      <section className="project-detail-hero">
        <div className="portfolio-container project-detail-hero__inner">
          <Link className="project-back-link" to="/projects"><ArrowLeft size={15} aria-hidden="true" /> All projects</Link>
          <div className="project-detail-hero__copy">
            <p className="portfolio-eyebrow"><i /> {project.category} / {project.status || 'PRODUCT CONCEPT'}</p>
            <h1>{project.title}</h1>
            <p>{project.description}</p>
            {technologies.length > 0 && <ul className="project-detail__tech-list">{technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>}
          </div>
          <ScrollReveal className="project-detail-hero__image">
            {project.image && <img src={project.image} alt={project.imageAlt || `${project.title} project visual`} />}
            <span>CONCEPT / {(project.sector || project.category || 'DIGITAL PRODUCT').toUpperCase()}</span>
          </ScrollReveal>
        </div>
      </section>

      <section className="project-detail-content">
        <div className="portfolio-container">
          <div className="project-detail__overview">
            <p className="portfolio-kicker">Project overview</p>
            <h2>A considered approach to {project.title}.</h2>
            <p>{project.description}</p>
          </div>
          {(project.approach || features.length > 0) && (
            <div className="project-detail__approach">
              <ScrollReveal className="project-detail__approach-copy">
                <p className="portfolio-kicker">{project.approach ? 'The approach' : 'Project features'}</p>
                <h2>{project.approach ? 'Make the complex feel considered.' : 'What this project includes.'}</h2>
                {project.approach && <p>{project.approach}</p>}
              </ScrollReveal>
              {features.length > 0 && (
                <ScrollReveal className="project-detail__highlights" delay={0.08}>
                  <p className="portfolio-kicker">Concept highlights</p>
                  <ul>{features.map((feature) => <li key={feature}><Check size={16} aria-hidden="true" />{feature}</li>)}</ul>
                </ScrollReveal>
              )}
            </div>
          )}
          {outcome && (
            <ScrollReveal className="project-detail__outcome">
              <span className="project-detail__outcome-number">N / RESULTS</span>
              <p>{outcome}</p>
              <ArrowUpRight size={20} aria-hidden="true" />
            </ScrollReveal>
          )}
          <Link className="project-next-link" to="/projects">Explore more projects <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </div>
      </section>
      <CTASection />
    </div>
  )
}

export default ProjectDetailPage