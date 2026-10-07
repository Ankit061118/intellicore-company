import { Link } from 'react-router-dom'
import useDocumentTitle from '../hooks/useDocumentTitle.js'

function NotFoundPage() {
  useDocumentTitle(
    'Page Not Found',
    'This Nexora Labs page could not be found. Return to the home page to explore our services and projects.',
    { noIndex: true },
  )

  return (
    <section className="portfolio-page portfolio-empty project-not-found page-container" aria-labelledby="not-found-title">
      <p className="portfolio-eyebrow"><i /> 404 / PAGE NOT FOUND</p>
      <h1 id="not-found-title">This page isn&apos;t here.</h1>
      <p>The address may be outdated, or the page may have moved.</p>
      <Link className="project-back-link" to="/">Return to Nexora Labs</Link>
    </section>
  )
}

export default NotFoundPage
