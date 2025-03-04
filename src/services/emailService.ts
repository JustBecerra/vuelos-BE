import nodemailer from "nodemailer"
import db from "../config/dbConfig"
import path from "path"
const { Clients } = db

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
		const attachmentPath = path.resolve(
			__dirname,
			"../files/pruebatecnica_php.pdf"
		)

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
							filename: "pruebatecnica_php.pdf",
							path: attachmentPath,
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
