const allowedFields = new Set([
  'name',
  'email',
  'phone',
  'company',
  'service',
  'budget',
  'message',
])

const fieldLimits = {
  name: 100,
  email: 254,
  phone: 30,
  company: 160,
  service: 120,
  budget: 80,
  message: 5000,
}

export function validateContact(req, _res, next) {
  const body = req.body

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    const error = new Error('Request body must be a JSON object')
    error.statusCode = 400
    return next(error)
  }

  const unknownFields = Object.keys(body).filter((field) => !allowedFields.has(field))
  if (unknownFields.length > 0) {
    const error = new Error(`Unknown field: ${unknownFields[0]}`)
    error.statusCode = 400
    return next(error)
  }

  const values = {}
  for (const [field, value] of Object.entries(body)) {
    if (typeof value !== 'string') {
      const error = new Error(`${field} must be a string`)
      error.statusCode = 400
      return next(error)
    }

    values[field] = value.trim()
    if (values[field].length > fieldLimits[field]) {
      const error = new Error(`${field} must be ${fieldLimits[field]} characters or fewer`)
      error.statusCode = 400
      return next(error)
    }
  }

  if (!values.name || values.name.length < 2) {
    const error = new Error('Name must be at least 2 characters')
    error.statusCode = 400
    return next(error)
  }

  if (!values.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    const error = new Error('A valid email address is required')
    error.statusCode = 400
    return next(error)
  }

  if (!values.message || values.message.length < 10) {
    const error = new Error('Message must be at least 10 characters')
    error.statusCode = 400
    return next(error)
  }

  if (values.phone && !/^[+()\d\s.-]{7,30}$/.test(values.phone)) {
    const error = new Error('Phone number is invalid')
    error.statusCode = 400
    return next(error)
  }

  req.body = values
  next()
}