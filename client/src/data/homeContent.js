import { BrainCircuit, Code2, Database, PanelsTopLeft } from 'lucide-react'

export const homeStats = [
  { value: 50, suffix: '+', label: 'Projects' },
  { value: 25, suffix: '+', label: 'Clients' },
  { value: 5, suffix: '+', label: 'Years Experience' },
  { value: 98, suffix: '%', label: 'Client satisfaction' },
]

export const homeServices = [
  { number: '01', title: 'Digital product engineering', description: 'From first prototype to dependable platform, we make ambitious products useful, fast, and ready to grow.', icon: Code2 },
  { number: '02', title: 'AI & intelligent workflows', description: 'Put data and automation to work in ways that give people more clarity, not another layer of complexity.', icon: BrainCircuit },
  { number: '03', title: 'Brand & experience', description: 'Build a distinct digital presence with a thoughtful system behind every interaction and detail.', icon: PanelsTopLeft },
  { number: '04', title: 'Data foundations', description: 'Connect the right information, infrastructure, and decisions into a foundation that can evolve.', icon: Database },
]

export const homePrinciples = [
  { number: '01', title: 'Clarity before code', description: 'We make the problem legible, align on what matters, and only then choose what to build.' },
  { number: '02', title: 'One connected team', description: 'Strategy, design, and engineering work together, so good ideas survive the hand-off.' },
  { number: '03', title: 'Made to move forward', description: 'We build systems your team can understand, maintain, and keep improving after launch.' },
]

export const featuredProjects = [
  {
    slug: 'aperture',
    title: 'Aperture',
    category: 'Decision intelligence / Concept',
    description: 'A clearer operating picture for teams working across complex systems.',
    image: '/images/circuit-board.jpg',
    imageAlt: 'Close view of a detailed circuit board and connected components',
  },
  {
    slug: 'northline',
    title: 'Northline',
    category: 'Product experience / Concept',
    description: 'A digital workspace that brings product work into sharper focus.',
    image: '/images/product-platform.jpg',
    imageAlt: 'Laptop displaying code on a clean, modern desk',
  },
  {
    slug: 'monument',
    title: 'Monument',
    category: 'Connected systems / Concept',
    description: 'A joined-up digital layer for the places and services people rely on.',
    image: '/images/urban-systems.jpg',
    imageAlt: 'Modern high-rise architecture viewed from below',
  },
]

export const projectProcess = [
  { number: '01', title: 'Find the signal', description: 'We listen, map the context, and agree on the most meaningful problem to solve.', duration: 'Discover' },
  { number: '02', title: 'Shape the direction', description: 'We turn the opportunity into a shared plan, an experience, and a testable first step.', duration: 'Define' },
  { number: '03', title: 'Build with intent', description: 'A close design and engineering loop turns the plan into a working, dependable product.', duration: 'Develop' },
  { number: '04', title: 'Learn and evolve', description: 'We launch thoughtfully, measure what matters, and keep making the system better.', duration: 'Deliver' },
]

export const clientPerspectives = [
  { quote: 'They helped us turn a complicated brief into a product direction the whole team could understand and act on.', role: 'Product leadership', label: 'Illustrative quote' },
  { quote: 'The work felt considered at every step. We had a clear view of the trade-offs and a partner who stayed close.', role: 'Technology team', label: 'Illustrative quote' },
  { quote: 'We came in with disconnected pieces. We left with a more coherent experience and a foundation to build on.', role: 'Operations team', label: 'Illustrative quote' },
]