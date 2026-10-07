import Project from '../models/Project.js'

export async function getProjects(_req, res) {
	const projects = await Project.find().sort({ featured: -1, createdAt: -1 }).lean()

	res.status(200).json({
		success: true,
		count: projects.length,
		data: projects,
	})
}

export async function getProjectBySlug(req, res) {
	const project = await Project.findOne({ slug: req.params.slug }).lean()

	if (!project) {
		const error = new Error('Project not found')
		error.statusCode = 404
		throw error
	}

	res.status(200).json({ success: true, data: project })
}
