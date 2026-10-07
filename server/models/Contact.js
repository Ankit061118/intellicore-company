import mongoose from 'mongoose'

const contactSchema = new mongoose.Schema({
	name: { type: String, required: true, trim: true, minlength: 2, maxlength: 100 },
	email: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
		maxlength: 254,
		match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
	},
	phone: { type: String, trim: true, maxlength: 30, default: '' },
	company: { type: String, trim: true, maxlength: 160, default: '' },
	service: { type: String, trim: true, maxlength: 120, default: '' },
	budget: { type: String, trim: true, maxlength: 80, default: '' },
	message: { type: String, required: true, trim: true, minlength: 10, maxlength: 5000 },
	createdAt: { type: Date, default: Date.now },
}, { versionKey: false })

const Contact = mongoose.model('Contact', contactSchema)

export default Contact
