import { Request, Response } from "express"

async function sendEmailController(req: Request, res: Response) {
	try {
		const { to, subject, text } = req.body

		if (!to || !subject || !text) {
			res.status(400).json({ message: "Missing required email fields" })
		}

		await sendEmail({ to, subject, text })
		res.status(200).json({ message: "Email sent successfully" })
	} catch (error) {
		res.status(500).json({
			message: "Failed to send email",
			error: error,
		})
	}
}

export { sendEmailController }
