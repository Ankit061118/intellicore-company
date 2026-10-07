import dns from 'node:dns'
import mongoose from 'mongoose'

export async function connectDB() {
	const { MONGO_URI } = process.env

	if (!MONGO_URI) {
		throw new Error('MONGO_URI is required')
	}

	const dnsServers = (process.env.MONGO_DNS_SERVERS || '')
		.split(',')
		.map((server) => server.trim())
		.filter(Boolean)

	if (dnsServers.length > 0) {
		dns.setServers(dnsServers)
	}

	await mongoose.connect(MONGO_URI)
	console.info('MongoDB connected')
}
