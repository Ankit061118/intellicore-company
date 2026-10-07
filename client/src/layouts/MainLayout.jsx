import { useEffect, useRef } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Footer from '../components/Footer.jsx'
import Navbar from '../components/Navbar.jsx'

function MainLayout() {
  const location = useLocation()
  const { pathname } = location
  const outlet = useOutlet()
  const prefersReducedMotion = useReducedMotion()
  const mainRef = useRef(null)
  const previousPathname = useRef(pathname)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  useEffect(() => {
    if (previousPathname.current === pathname) return

    previousPathname.current = pathname
    mainRef.current?.focus()
  }, [pathname])

  return (
    <>
      <div className="ambient-grid" aria-hidden="true" />
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navbar />
      <main id="main-content" className="site-main" ref={mainRef} tabIndex="-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={pathname}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 7 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -4 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {outlet}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </>
  )
}

export default MainLayout