import type { Request, Response } from "express"
import { sendEmail } from "../services/emailService"

async function sendEmailController(req: Request, res: Response) {
	try {
		const { to, subject, text, contract } = req.body

		if (!to || !subject || !text || !contract) {
			res.status(400)
		}

		const email = await sendEmail({ to, subject, text, contract })
		if (email === "contract not found") {
			res.status(404)
		}

		res.status(200).json({ message: "Email sent successfully" })
	} catch (error) {
		res.status(500).json({
			message: "Failed to send email",
			error: error,
		})
	}
}

export { sendEmailController }
