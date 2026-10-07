import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import { connectDB } from './config/db.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
import contactRoutes from './routes/contactRoutes.js'
import projectRoutes from './routes/projectRoute.js'

const app = express()
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
	.split(',')
	.map((origin) => origin.trim())
	.filter(Boolean)

app.disable('x-powered-by')
app.use(cors({
	origin(origin, callback) {
		if (!origin || allowedOrigins.includes(origin)) {
			return callback(null, true)
		}

		const error = new Error('Origin is not allowed by CORS')
		error.statusCode = 403
		callback(error)
	},
	methods: ['GET', 'POST'],
	allowedHeaders: ['Accept', 'Content-Type'],
}))
app.use(express.json({ limit: '20kb' }))

app.get('/api/health', (_req, res) => {
	const isConnected = mongoose.connection.readyState === 1
	res.status(isConnected ? 200 : 503).json({
		status: isConnected ? 'ok' : 'unavailable',
		database: isConnected ? 'connected' : 'disconnected',
		timestamp: new Date().toISOString(),
	})
})

app.use('/api/projects', projectRoutes)
app.use('/api/contact', contactRoutes)
app.use(notFound)
app.use(errorHandler)

const port = Number(process.env.PORT) || 5000

try {
	await connectDB()
	app.listen(port, () => console.info(`API listening on port ${port}`))
} catch (error) {
	console.error(`Server startup failed: ${error.message}`)
	process.exitCode = 1
}
