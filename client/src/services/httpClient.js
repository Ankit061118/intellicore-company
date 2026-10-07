const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/+$/, '')

export class ApiError extends Error {
  constructor(message, status = 0, payload = null) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.payload = payload
  }
}

async function request(path, options = {}) {
  let response

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        Accept: 'application/json',
        ...options.headers,
      },
    })
  } catch (error) {
    if (error.name === 'AbortError') throw error
    throw new ApiError('Unable to reach the API. Check that the backend is running.')
  }

  let payload = null
  if (response.status !== 204) {
    try {
      payload = await response.json()
    } catch {
      throw new ApiError('The server returned an invalid response.', response.status)
    }
  }

  if (!response.ok) {
    throw new ApiError(payload?.message || `Request failed with status ${response.status}`, response.status, payload)
  }

  return payload
}

export const httpClient = {
  get: (path, options = {}) => request(path, { ...options, method: 'GET' }),
  post: (path, body, options = {}) => request(path, {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options.headers },
    body: JSON.stringify(body),
  }),
}