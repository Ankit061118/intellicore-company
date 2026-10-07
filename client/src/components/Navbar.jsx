import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Menu, Orbit, X } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Link, NavLink } from 'react-router-dom'
import Button from './Button.jsx'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Projects', to: '/projects' },
]

const menuVariants = {
  closed: { height: 0, opacity: 0 },
  open: {
    height: 'auto',
    opacity: 1,
    transition: {
      height: { duration: 0.24, ease: [0.22, 1, 0.36, 1] },
      opacity: { duration: 0.16 },
      when: 'beforeChildren',
      staggerChildren: 0.035,
    },
  },
  exit: { height: 0, opacity: 0, transition: { height: { duration: 0.18 }, opacity: { duration: 0.12 }, when: 'afterChildren' } },
}

const itemVariants = {
  closed: { opacity: 0, y: -5 },
  open: { opacity: 1, y: 0, transition: { duration: 0.18, ease: 'easeOut' } },
}

const reducedMenuVariants = {
  closed: { height: 0, opacity: 0, transition: { duration: 0 } },
  open: { height: 'auto', opacity: 1, transition: { duration: 0 } },
  exit: { height: 0, opacity: 0, transition: { duration: 0 } },
}

const reducedItemVariants = {
  closed: { opacity: 1, y: 0 },
  open: { opacity: 1, y: 0, transition: { duration: 0 } },
}

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(() => window.scrollY > 18)
  const menuButtonRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 18)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!isMenuOpen) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isMenuOpen])

  const closeMenu = () => setIsMenuOpen(false)
  return (
    <motion.header
      className={`site-header${isScrolled ? ' is-scrolled' : ''}`}
      initial={prefersReducedMotion ? false : { opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.26, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav className="navbar page-container" aria-label="Main navigation">
        <Link className="brand" to="/" aria-label="Nexora Labs home">
          <span className="brand__mark" aria-hidden="true"><Orbit size={19} /></span>
          <span className="brand__name">Nexora <span>Labs</span></span>
        </Link>
        <button
          className="navbar__toggle"
          type="button"
          ref={menuButtonRef}
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={isMenuOpen ? 'close' : 'open'}
              initial={prefersReducedMotion ? false : { opacity: 0, rotate: -35, scale: 0.85 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, rotate: 35, scale: 0.85 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.14 }}
              style={{ display: 'inline-flex', lineHeight: 0 }}
            >
              {isMenuOpen ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
            </motion.span>
          </AnimatePresence>
        </button>
        <div className="navbar__desktop-links">
          {navItems.map(({ label, to }) => (
            <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => `navbar__link${isActive ? ' is-active' : ''}`}>
              {label}
            </NavLink>
          ))}
          <Button className="navbar__contact" to="/contact">
            Let's Talk <ArrowUpRight size={15} aria-hidden="true" />
          </Button>
        </div>
      </nav>
      <div
        id="mobile-navigation"
        className={`navbar__mobile${isMenuOpen ? ' is-open' : ''}`}
        aria-hidden={!isMenuOpen}
        inert={!isMenuOpen}
      >
        <AnimatePresence initial={false}>
          {isMenuOpen && (
            <motion.div
              className="navbar__mobile-inner page-container"
              variants={prefersReducedMotion ? reducedMenuVariants : menuVariants}
              initial={prefersReducedMotion ? false : 'closed'}
              animate="open"
              exit={prefersReducedMotion ? 'closed' : 'exit'}
            >
              <div className="navbar__mobile-links">
                {navItems.map(({ label, to }) => (
                  <motion.div key={to} variants={prefersReducedMotion ? reducedItemVariants : itemVariants}>
                    <NavLink to={to} end={to === '/'} onClick={closeMenu} className={({ isActive }) => `navbar__link${isActive ? ' is-active' : ''}`}>
                      {label}
                    </NavLink>
                  </motion.div>
                ))}
              </div>
              <motion.div variants={prefersReducedMotion ? reducedItemVariants : itemVariants}>
                <Button className="navbar__contact" to="/contact" onClick={closeMenu}>
                  Let's Talk <ArrowUpRight size={15} aria-hidden="true" />
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}

export default Navbar