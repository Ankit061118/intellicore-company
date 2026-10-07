import { useEffect, useMemo, useState } from 'react'
import { RefreshCw, Search, X } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { api } from '../services/api.js'
import useDocumentTitle from '../hooks/useDocumentTitle.js'
import ProjectCard from '../components/ProjectCard.jsx'
import ScrollReveal from '../components/ScrollReveal.jsx'
import './ProjectsPage.css'

const EMPTY_PROJECTS = []

function ProjectsPage() {
  const [requestState, setRequestState] = useState({ key: null, projects: [], error: null, loading: true })
  const [retryCount, setRetryCount] = useState(0)
  const [activeCategory, setActiveCategory] = useState('All')
  const [query, setQuery] = useState('')
  const prefersReducedMotion = useReducedMotion()
  const requestIsCurrent = requestState.key === retryCount
  const projects = requestIsCurrent ? requestState.projects : EMPTY_PROJECTS
  const error = requestIsCurrent ? requestState.error : null
  const loading = !requestIsCurrent || requestState.loading
  useDocumentTitle(
    'Digital Product Projects',
    'Explore Nexora Labs digital product concepts across fintech, e-commerce, AI, productivity, and connected systems.',
  )

  useEffect(() => {
    const controller = new AbortController()

    api.projects.list({ signal: controller.signal })
      .then((loadedProjects) => {
        setRequestState({ key: retryCount, projects: loadedProjects, error: null, loading: false })
      })
      .catch((loadError) => {
        if (loadError.name !== 'AbortError') {
          setRequestState({ key: retryCount, projects: [], error: loadError, loading: false })
        }
      })

    return () => controller.abort()
  }, [retryCount])

  const projectCategories = ['All', ...new Set(projects.map((project) => project.category).filter(Boolean))]

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return projects.filter((project) => {
      const matchesCategory = activeCategory === 'All' || project.category === activeCategory
      const searchableText = [project.title, project.category, project.sector, project.description, ...(project.technologies || [])].join(' ').toLowerCase()
      return matchesCategory && (!normalizedQuery || searchableText.includes(normalizedQuery))
    })
  }, [activeCategory, projects, query])

  const retry = () => setRetryCount((count) => count + 1)

  return (
    <div className="portfolio-page">
      <section className="portfolio-hero" aria-labelledby="portfolio-title">
        <div className="portfolio-hero__grid" aria-hidden="true" />
        <div className="portfolio-container portfolio-hero__inner">
          <ScrollReveal className="portfolio-hero__copy">
            <p className="portfolio-eyebrow"><i /> SELECTED WORK / NEXORA LABS</p>
            <h1 id="portfolio-title">Projects with a point of view.</h1>
            <p>Digital product concepts shaped around the people, systems, and opportunities behind each challenge.</p>
          </ScrollReveal>
          <div className="portfolio-hero__stat" aria-label={`${loading ? 'Loading' : projects.length} portfolio concepts`}><strong>{loading ? '--' : String(projects.length).padStart(2, '0')}</strong><span>PROJECT<br />CONCEPTS</span></div>
        </div>
      </section>

      <section className="portfolio-work" aria-labelledby="portfolio-work-title">
        <div className="portfolio-container">
          <div className="portfolio-work__heading">
            <div><p className="portfolio-kicker">The portfolio</p><h2 id="portfolio-work-title">Explore our work</h2></div>
            <p>Browse by discipline or search the toolkit behind each concept.</p>
          </div>

          {!loading && !error && projects.length > 0 && (
            <div className="portfolio-controls">
              <div className="portfolio-filters" role="group" aria-label="Filter projects by category">
                {projectCategories.map((category) => (
                  <motion.button key={category} type="button" className={`portfolio-filter${activeCategory === category ? ' is-active' : ''}`} aria-pressed={activeCategory === category} onClick={() => setActiveCategory(category)} whileHover={prefersReducedMotion ? undefined : { y: -1 }} whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}>
                    {category}
                  </motion.button>
                ))}
              </div>
              <label className="portfolio-search">
                <Search size={17} aria-hidden="true" />
                <span className="visually-hidden">Search projects</span>
                <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search projects or tech" />
                {query && <button type="button" aria-label="Clear search" onClick={() => setQuery('')}><X size={15} aria-hidden="true" /></button>}
              </label>
            </div>
          )}

          {!loading && !error && projects.length > 0 && <p className="portfolio-results" aria-live="polite">Showing <strong>{filteredProjects.length}</strong> of {projects.length} projects</p>}
          {loading ? (
            <div className="portfolio-grid" role="status" aria-label="Loading projects">
              {Array.from({ length: 3 }, (_, index) => (
                <div className="portfolio-skeleton-card" key={index} aria-hidden="true">
                  <div className="api-skeleton portfolio-skeleton-image" />
                  <div className="portfolio-skeleton-body">
                    <div className="api-skeleton portfolio-skeleton-category" />
                    <div className="api-skeleton portfolio-skeleton-title" />
                    <div className="api-skeleton portfolio-skeleton-copy" />
                    <div className="api-skeleton portfolio-skeleton-copy portfolio-skeleton-copy--short" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="portfolio-empty portfolio-load-state">
              <RefreshCw size={21} aria-hidden="true" />
              <h3>Projects couldn&apos;t be loaded</h3>
              <p role="alert">{error.message}</p>
              <button type="button" onClick={retry}>Retry</button>
            </div>
          ) : projects.length === 0 ? (
            <div className="portfolio-empty portfolio-load-state">
              <h3>No projects published yet</h3>
              <p role="status">Published projects will appear here.</p>
              <button type="button" onClick={retry}>Refresh</button>
            </div>
          ) : filteredProjects.length > 0 ? (
            <motion.div className="portfolio-grid" layout={!prefersReducedMotion}>
              <AnimatePresence initial={false} mode="popLayout">
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.slug}
                    layout={!prefersReducedMotion}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 9, scale: 0.992 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={prefersReducedMotion ? undefined : { opacity: 0, y: 5, scale: 0.992 }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <ProjectCard {...project} slug={project.slug} actionLabel="View project" className="portfolio-project-card" />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="portfolio-empty">
              <Search size={21} aria-hidden="true" />
              <h3>No matching projects</h3>
              <p role="status">Try a different search or choose another category.</p>
              <button type="button" onClick={() => { setActiveCategory('All'); setQuery('') }}>Clear filters</button>
            </div>
          )}
          <p className="portfolio-disclaimer">Portfolio entries are illustrative concepts, not published client case studies.</p>
        </div>
      </section>
    </div>
  )
}

export default ProjectsPage