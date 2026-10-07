import useDocumentTitle from '../hooks/useDocumentTitle.js'
import CTASection from '../components/home/CTASection.jsx'
import StatsSection from '../components/home/StatsSection.jsx'
import AboutHero from '../components/about/AboutHero.jsx'
import CompanyStorySection from '../components/about/CompanyStorySection.jsx'
import MissionVisionSection from '../components/about/MissionVisionSection.jsx'
import ValuesSection from '../components/about/ValuesSection.jsx'
import TechnologyStackSection from '../components/about/TechnologyStackSection.jsx'
import TeamSection from '../components/about/TeamSection.jsx'
import CompanyTimelineSection from '../components/about/CompanyTimelineSection.jsx'
import './AboutPage.css'

function AboutPage() {
  useDocumentTitle(
    'About',
    'Meet Nexora Labs: a connected digital studio bringing clear thinking, design, and technology to ambitious ideas.',
  )

  return (
    <div className="about-page">
      <AboutHero />
      <CompanyStorySection />
      <MissionVisionSection />
      <ValuesSection />
      <StatsSection />
      <TechnologyStackSection />
      <TeamSection />
      <CompanyTimelineSection />
      <CTASection />
    </div>
  )
}

export default AboutPage