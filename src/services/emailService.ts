import nodemailer from "nodemailer"
import db from "../config/dbConfig"

const { Clients, Files } = db

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.EMAIL_ADDRESS,
		pass: process.env.EMAIL_PASSWORD,
	},
})

async function sendEmail({
	to,
	subject,
	text,
	contract,
}: {
	to: string
	subject: string
	text: string
	contract: boolean
}) {
	try {
		const contractFile = await Files.findOne({
			where: { original_name: "pruebatecnica_php.pdf" },
		})

		if (!contractFile) return "contract not found"

		const passengerEmailAddress = await Clients.findOne({
			where: {
				fullname: to,
			},
		}).then((res) => res?.dataValues.email)
		const html = text
		const info = await transporter.sendMail({
			from: process.env.EMAIL_ADDRESS,
			to: passengerEmailAddress as string,
			subject,
			html: html,
			attachments: contract
				? [
						{
							filename: contractFile?.dataValues.original_name,
							content: contractFile?.dataValues.source,
							contentType: "application/pdf",
						},
				  ]
				: undefined,
		})

		return info
	} catch (error) {
		console.error("Error sending email:", error)
		throw error
	}
}

export { sendEmail }
