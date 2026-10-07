export function notFound(req, _res, next) {
	const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`)
	error.statusCode = 404
	next(error)
}

export function errorHandler(error, _req, res, _next) {
	if (res.headersSent) return

	let statusCode = error.statusCode || error.status || 500
	let message = error.message || 'Internal server error'

	if (error.code === 11000) {
		statusCode = 409
		message = 'A record with that value already exists'
	} else if (error.name === 'ValidationError' || error.name === 'CastError') {
		statusCode = 400
	}

	if (statusCode >= 500 && process.env.NODE_ENV === 'production') {
		message = 'Internal server error'
	}

	res.status(statusCode).json({
		success: false,
		message,
		...(process.env.NODE_ENV !== 'production' && error.name ? { error: error.name } : {}),
	})
}
