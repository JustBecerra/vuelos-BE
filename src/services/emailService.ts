import nodemailer from "nodemailer"
import db from "../config/dbConfig"
const { Clients } = db

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
		const splitTo = to.split(" ")

		const passengerEmailAddress = await Clients.findOne({
			where: {
				firstname: splitTo[0],
				lastname: splitTo[1],
			},
		}).then((res) => res?.dataValues.email)

		const info = await transporter.sendMail({
			from: process.env.EMAIL_ADDRESS, // email de tangojet
			to: passengerEmailAddress as string,
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
