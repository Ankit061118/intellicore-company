import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
	title: { type: String, required: true, trim: true, maxlength: 160 },
	slug: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		trim: true,
		match: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
	},
	description: { type: String, required: true, trim: true, maxlength: 3000 },
	category: { type: String, required: true, trim: true, maxlength: 100 },
	image: { type: String, required: true, trim: true },
	gallery: { type: [String], default: [] },
	technologies: { type: [String], default: [] },
	features: { type: [String], default: [] },
	results: { type: [String], default: [] },
	liveUrl: { type: String, trim: true, default: '' },
	githubUrl: { type: String, trim: true, default: '' },
	featured: { type: Boolean, default: false },
	createdAt: { type: Date, default: Date.now },
}, { versionKey: false })

const Project = mongoose.model('Project', projectSchema)

export default Project
