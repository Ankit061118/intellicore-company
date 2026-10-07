import { httpClient } from './httpClient.js'

function unwrapData(response) {
  return response?.data ?? response
}

export const api = {
  projects: {
    async list(options = {}) {
      const response = await httpClient.get('/projects', options)
      const projects = unwrapData(response)

      if (!Array.isArray(projects)) {
        throw new Error('The projects response is invalid.')
      }

      return projects
    },
    async getBySlug(slug, options = {}) {
      const response = await httpClient.get(`/projects/${encodeURIComponent(slug)}`, options)
      return unwrapData(response)
    },
  },
  contact: {
    async create(values, options = {}) {
      const response = await httpClient.post('/contact', values, options)
      return unwrapData(response)
    },
  },
}