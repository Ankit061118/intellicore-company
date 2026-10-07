import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { projects } from './src/data/projects.js'

const pages = [
  {
    path: '/',
    title: 'Digital Product & AI Studio | Nexora Labs',
    description: 'Nexora Labs brings strategy, design, and technology together to build useful digital products and intelligent systems.',
  },
  {
    path: '/about',
    title: 'About | Nexora Labs',
    description: 'Meet Nexora Labs: a connected digital studio bringing clear thinking, design, and technology to ambitious ideas.',
  },
  {
    path: '/services',
    title: 'Digital Product, AI & Software Services | Nexora Labs',
    description: 'Explore Nexora Labs services in web and mobile development, product design, cloud engineering, AI automation, and custom software.',
  },
  {
    path: '/projects',
    title: 'Digital Product Projects | Nexora Labs',
    description: 'Explore Nexora Labs digital product concepts across fintech, e-commerce, AI, productivity, and connected systems.',
  },
  {
    path: '/contact',
    title: 'Contact | Nexora Labs',
    description: 'Tell Nexora Labs about your product, software, or AI challenge and start a conversation with our team.',
  },
  ...projects.map((project) => ({
    path: `/projects/${project.slug}`,
    title: `${project.title} Project | Nexora Labs`,
    description: project.description,
    image: project.image,
    type: 'article',
  })),
]

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character])
}

function htmlForPage(html, page, siteUrl) {
  const canonicalUrl = `${siteUrl}${page.path}`
  const imageUrl = new URL(page.image || '/images/circuit-board.jpg', `${siteUrl}/`).href
  const description = escapeHtml(page.description)
  const title = escapeHtml(page.title)
  const metadata = [
    `<meta name="description" content="${description}" />`,
    '<meta name="robots" content="index, follow" />',
    `<link rel="canonical" href="${canonicalUrl}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:type" content="${page.type || 'website'}" />`,
    `<meta property="og:url" content="${canonicalUrl}" />`,
    `<meta property="og:image" content="${imageUrl}" />`,
    '<meta property="og:site_name" content="Nexora Labs" />',
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${imageUrl}" />`,
  ].join('\n    ')

  return html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
    .replace(/<meta name="description" content="[^"]*" \/>/, '')
    .replace('</head>', `    ${metadata}\n  </head>`)
}

function seoFilesPlugin(siteUrl) {
  const urls = pages
    .map(({ path }) => `  <url><loc>${siteUrl}${path}</loc></url>`)
    .join('\n')
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
  const robots = `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`
  const files = { 'sitemap.xml': sitemap, 'robots.txt': robots }

  return {
    name: 'nexora-seo-files',
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        const path = request.url?.split('?')[0]?.slice(1)
        if (!(path in files)) return next()

        response.setHeader('Content-Type', path.endsWith('.xml') ? 'application/xml; charset=utf-8' : 'text/plain; charset=utf-8')
        response.end(files[path])
      })
    },
    generateBundle() {
      Object.entries(files).forEach(([fileName, source]) => this.emitFile({ type: 'asset', fileName, source }))
    },
    async closeBundle() {
      const distDirectory = resolve('dist')
      const indexPath = resolve(distDirectory, 'index.html')
      const baseHtml = await readFile(indexPath, 'utf8')

      for (const page of pages) {
        const outputPath = page.path === '/'
          ? indexPath
          : resolve(distDirectory, page.path.slice(1), 'index.html')
        await mkdir(dirname(outputPath), { recursive: true })
        await writeFile(outputPath, htmlForPage(baseHtml, page, siteUrl))
      }
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', 'VITE_')
  const configuredSiteUrl = env.VITE_SITE_URL || 'https://nexoralabs.com'
  const parsedSiteUrl = new URL(configuredSiteUrl)

  if (!['https:', 'http:'].includes(parsedSiteUrl.protocol)) {
    throw new Error('VITE_SITE_URL must use HTTP or HTTPS.')
  }

  const siteUrl = parsedSiteUrl.origin

  return {
    plugins: [react(), tailwindcss(), seoFilesPlugin(siteUrl)],
  }
})
