import Contact from '../models/Contact.js'

export async function createContact(req, res) {
	const contact = await Contact.create(req.body)

	res.status(201).json({
		success: true,
		message: 'Contact request received',
		data: { id: contact.id },
	})
}
