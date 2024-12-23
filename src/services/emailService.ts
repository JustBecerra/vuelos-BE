const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "your-email@gmail.com", // email de tangojet
		pass: "your-app-password", // su password
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
			from: '"Your App" <your-email@gmail.com>', // email de tangojet
			to,
			subject,
			text,
		})

		console.log("Email sent:", info.messageId)
		return info
	} catch (error) {
		console.error("Error sending email:", error)
		throw error
	}
}

module.exports = { sendEmail }
