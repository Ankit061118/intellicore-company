import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { featuredProjects } from '../../data/homeContent.js'
import SectionHeading from '../SectionHeading.jsx'
import ProjectCard from '../ProjectCard.jsx'
import ScrollReveal, { StaggerGroup, StaggerItem } from '../ScrollReveal.jsx'

function FeaturedProjectsSection() {
  return (
    <section className="home-section home-projects" id="projects">
      <div className="home-container">
        <div className="home-section__heading home-section__heading--row">
          <ScrollReveal><SectionHeading eyebrow="Selected concepts" title="Ideas, brought into focus." description="A glimpse at the kinds of systems and experiences we love to make." /></ScrollReveal>
          <Link className="home-text-link" to="/projects">View all work <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </div>
        <StaggerGroup className="home-project-grid" delay={0.03}>
          {featuredProjects.map((project) => (
            <StaggerItem key={project.slug}>
              <ProjectCard {...project} className="home-project-card" />
            </StaggerItem>
          ))}
        </StaggerGroup>
        <p className="home-projects__note">Concept directions shown for illustrative purposes.</p>
      </div>
    </section>
  )
}

export default FeaturedProjectsSection