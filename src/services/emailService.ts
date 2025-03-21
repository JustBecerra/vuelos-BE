import nodemailer from "nodemailer"
import db from "../config/dbConfig"
import nodemailerMjmlPlugin from "nodemailer-mjml"
import { join } from "path"

const { Clients, Files } = db

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.EMAIL_ADDRESS,
		pass: process.env.EMAIL_PASSWORD,
	},
})

transporter.use(
	"compile",
	nodemailerMjmlPlugin({ templateFolder: join(__dirname, "templates") })
)

async function sendEmail({
	to,
	subject,
	url,
	type_of_email,
}: {
	to: string
	subject: string
	url?: string
	type_of_email: string
}) {
	try {
		const passenger = await Clients.findOne({
			where: {
				fullname: to,
			},
		})
		const passengerEmailAddress = passenger?.dataValues.email
		const passengerName = passenger?.dataValues.fullname

		const TextDecider = () => {
			switch (type_of_email) {
				case "quote": {
					return `<p>We&apos;re pleased to inform you that your flight has been successfully pre-scheduled. Below are the details:</p>

							<p>To proceed with your booking, please select your preferred airship from the available options following the link below</p>

							<p>Please make your selection as soon as possible to ensure availability.</p>

							<p>If you have any questions or need assistance, feel free to contact us.</p>

							<p>Thank you for choosing Tango Jets.</p>`
				}
				case "invoice": {
					return `<p>We&apos;re pleased to inform you that your flight has been successfully scheduled. Below are the details:</p>

    						<p>Please ensure you arrive at the airport at least one hour before departure for check-in.</p>

    						<p>To confirm your booking, please complete the payment using the link below:</p>

    						<p>If you have any questions or need assistance, feel free to contact us.</p>

    						<p>Thank you for choosing Tango Jets.</p>`
				}
				case "contract": {
					return `<p>I hope this email finds you well.</p>

							<p>Attached, you will find the contract for your upcoming flight with us. Please review the terms and conditions outlined in the document carefully.</p>

							<p>To proceed with your booking, kindly sign the contract and return it to us at your earliest convenience. If you have any questions or require any clarification, feel free to reach out to us directly.</p>

							<p>We look forward to providing you with an exceptional flying experience. Should you need any assistance in preparing for your flight, don't hesitate to contact us.</p>

							<p>Thank you for choosing Tango Jets. We look forward to serving you.</p>`
				}
				default:
					""
			}
		}

		const buttonText = () => {
			if (type_of_email === "quote") return "Go to quote"
			else if (type_of_email === "invoice") return "Go to invoice"
			else if (type_of_email === "contract") return "Go to contract"
		}

		const info = await transporter.sendMail({
			from: process.env.EMAIL_ADDRESS,
			to: passengerEmailAddress as string,
			subject,
			html: `<!doctype html><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><title></title><!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]--><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style type="text/css">#outlook a { padding:0; }
          body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
          table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
          img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
          p { display:block;margin:13px 0; }</style><!--[if mso]>
        <noscript>
        <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
        </xml>
        </noscript>
        <![endif]--><!--[if lte mso 11]>
        <style type="text/css">
          .mj-outlook-group-fix { width:100% !important; }
        </style>
        <![endif]--><!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,700" rel="stylesheet" type="text/css"><style type="text/css">@import url(https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,700);</style><!--<![endif]--><style type="text/css">@media only screen and (min-width:480px) {
        .mj-column-per-100 { width:100% !important; max-width: 100%; }
      }</style><style media="screen and (min-width:480px)">.moz-text-html .mj-column-per-100 { width:100% !important; max-width: 100%; }</style><style type="text/css">@media only screen and (max-width:480px) {
      table.mj-full-width-mobile { width: 100% !important; }
      td.mj-full-width-mobile { width: auto !important; }
    }</style></head><body style="word-spacing:normal;background-color:#ffffff;">
	<div style="background:#020221;background-color:#020221;margin:0px auto;max-width:600px;"><!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" bgcolor="#ffffff" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0px;padding-top:0;text-align:center;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]--><div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"><tbody><tr><td align="center" style="font-size:0px;padding:10px 25px;padding-top:0;padding-right:0px;padding-bottom:0px;padding-left:0px;word-break:break-word;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"><tbody><tr><td style="width:600px;"><img alt="" height="auto" src="http://go.mailjet.com/tplimg/mtrq/b/ox8s/mg1rw.png" style="border:none;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="600"></td></tr></tbody></table></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" style="background:#020221;background-color:#020221;margin:0px auto;max-width:600px;" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="background:#020221;background-color:#020221;margin:0px auto;max-width:600px;""><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#020221;background-color:#020221;margin:0px auto;max-width:600px;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0px;padding-top:0;text-align:center;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]--><div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"><tbody><tr><td align="left" style="font-size:0px;padding:10px 25px;padding-top:50px;padding-right:25px;padding-bottom:30px;padding-left:25px;word-break:break-word;"><div style="font-family:open Sans Helvetica, Arial, sans-serif;font-size:45px;font-weight:bold;line-height:1;text-align:left;color:#ffffff;">Welcome aboard</div></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" bgcolor="#009fe3" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="background:#020221;background-color:#020221;margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#020221;background-color:#020221;margin:0px auto;width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:20px;padding-top:20px;text-align:center;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:middle;width:600px;" ><![endif]--><div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:middle;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:middle;" width="100%"><tbody><tr><td align="left" style="font-size:0px;padding:10px 25px;padding-right:25px;padding-left:25px;word-break:break-word;"><div style="font-family:open Sans Helvetica, Arial, sans-serif;font-size:22px;line-height:1;text-align:left;color:#ffffff;"><span style="color:#FEEB35">Dear ${passengerName}</span><br><br>Welcome to Tango Jets.</div></td></tr><tr><td align="left" style="font-size:0px;padding:10px 25px;padding-right:25px;padding-left:25px;word-break:break-word;"><div style="font-family:open Sans Helvetica, Arial, sans-serif;font-size:15px;line-height:1;text-align:left;color:#ffffff;">
	${TextDecider()}

</div></td></tr><tr><td align="left" vertical-align="middle" style="font-size:0px;padding:10px 25px;word-break:break-word;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;"><tr><td align="center" bgcolor="#ffffff" role="presentation" style="border:none;border-radius:10px;cursor:auto;mso-padding-alt:10px 25px;background:#ffffff;" valign="middle">

		<a href=${url} style="display:inline-block;background:#464646;color:#ffffff;font-family:open Sans Helvetica, Arial, sans-serif;font-size:22px;font-weight:bold;line-height:120%;margin:0;text-decoration:none;text-transform:none;padding:10px 25px;mso-padding-alt:0px;border-radius:10px;opacity:#464646">${buttonText()}</a>
	</td></tr></table></td></tr><tr><td align="left" style="font-size:0px;padding:10px 25px;padding-right:25px;padding-left:25px;word-break:break-word;"><div style="font-family:open Sans Helvetica, Arial, sans-serif;font-size:15px;line-height:1;text-align:left;color:#ffffff;">Thanks,<br>Tango Jets Team</div></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></div></body></html>`,
		})

		return info
	} catch (error) {
		console.error("Error sending email:", error)
		throw error
	}
}

export { sendEmail }
