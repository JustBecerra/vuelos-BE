import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.EMAIL_ADDRESS, // email de tangojet
		pass: process.env.EMAIL_PASSWORD, // su password
	},
})

async function sendEmail({
	to,
	subject,
	text,
}: {
	to: string
	subject: string
	text: string
}) {
	try {
		const info = await transporter.sendMail({
			from: process.env.EMAIL_ADDRESS, // email de tangojet
			to,
			subject,
			text,
		})

		return info
	} catch (error) {
		console.error("Error sending email:", error)
		throw error
	}
}

export { sendEmail }
