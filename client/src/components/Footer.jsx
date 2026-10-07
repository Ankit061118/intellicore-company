import { ArrowUpRight, Orbit } from 'lucide-react'
import { Link } from 'react-router-dom'
import { navigationLinks } from '../data/navigation.js'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-container site-footer__inner">
        <Link className="brand brand--footer" to="/">
          <span className="brand__mark" aria-hidden="true"><Orbit size={19} /></span>
          <span className="brand__name">Nexora <span>Labs</span></span>
        </Link>
        <p className="site-footer__note">Ideas into intelligent systems.</p>
        <nav className="site-footer__links" aria-label="Footer navigation">
          {navigationLinks.map(({ label, to }) => <Link key={to} to={to}>{label}</Link>)}
          <Link to="/contact" aria-label="Contact Nexora Labs"><ArrowUpRight size={16} aria-hidden="true" /></Link>
        </nav>
        <p className="site-footer__copyright">© {new Date().getFullYear()} Nexora Labs</p>
      </div>
    </footer>
  )
}

export default Footer