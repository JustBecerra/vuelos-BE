import { Dropbox } from "dropbox"
import db from "../config/dbConfig"
const { Airships, Images } = db

interface airshipProps {
	id: number
	title: string
	status: string
	pricepermile: number
	seats: number
	size: string
	images: File[]
}

const getAirshipsService = async () => {
	try {
		const airships = await Airships.findAll()

		if (!airships) throw new Error("There are no airships available")

		return airships
	} catch (err) {
		console.error(err)
		return null
	}
}

const postAirshipService = async (
	airship: airshipProps,
	images: Express.Multer.File[]
) => {
	const { title, status, pricepermile, seats, size } = airship
	try {
		if (!process.env.ACCESS_TOKEN) {
			throw new Error("Dropbox access token is missing or undefined")
		}

		const dbx = new Dropbox({
			accessToken: process.env.ACCESS_TOKEN,
			fetch: fetch,
		})

		const newAirship = await Airships.create({
			title,
			status,
			pricepermile,
			seats,
			size,
		})

		if (!newAirship) throw new Error("Airship creation failed")

		const getAirshipID = await Airships.findOne({ where: { title } })

		for (const file of images) {
			const response = await dbx.filesUpload({
				path: `/tangoJets/${file.originalname}`,
				contents: file.buffer,
			})

			if (response && response.result.path_display) {
				let sharedLink

				try {
					// Attempt to create a shared link
					const sharedLinkResponse =
						await dbx.sharingCreateSharedLinkWithSettings({
							path: response.result.path_display,
						})
					sharedLink = sharedLinkResponse.result.url.replace(
						"dl=0",
						"raw=1"
					)
				} catch (error: any) {
					// If the error indicates that the shared link already exists, retrieve the existing link
					if (
						error.error &&
						error.error[".tag"] === "shared_link_already_exists"
					) {
						const existingLinkResponse =
							await dbx.sharingGetSharedLinkMetadata({
								url: `https://www.dropbox.com/home${response.result.path_display}`,
							})
						sharedLink = existingLinkResponse.result.url.replace(
							"dl=0",
							"raw=1"
						)
					} else {
						console.error("Error creating shared link:", error)
						continue // Skip to the next file if there's an error
					}
				}

				if (getAirshipID) {
					await Images.create({
						image_url: sharedLink, // Store the URL of the uploaded image
						airship_id: getAirshipID.dataValues.id,
					})
				}
			}
		}

		return newAirship
	} catch (err) {
		console.error(err)
		return null
	}
}

const putAirshipService = async (airship: airshipProps) => {
	const { id, title, status, pricepermile, seats, size } = airship
	try {
		const oldAirship = await Airships.findByPk(id)

		if (oldAirship) {
			const airshipToModify = await Airships.update(
				{
					title: title || oldAirship.dataValues.title,
					status: status || oldAirship.dataValues.status,
					pricepermile:
						pricepermile || oldAirship.dataValues.pricepermile,
					seats: seats || oldAirship.dataValues.seats,
					size: size || oldAirship.dataValues.size,
				},
				{
					where: {
						id,
					},
				}
			)
			if (airshipToModify[0] < 1) return 0
			return airshipToModify
		} else {
			return 0
		}
	} catch (err) {
		console.error(err)
		throw new Error("airship modification wasnt possible")
	}
}

const deleteAirshipService = async (airshipID: number) => {
	try {
		const deleteAirship = await Airships.destroy({
			where: {
				id: airshipID,
			},
		})

		return deleteAirship
	} catch (err) {
		console.error(err)
		throw new Error("airship deletion wasnt possible")
	}
}

export {
	getAirshipsService,
	postAirshipService,
	putAirshipService,
	deleteAirshipService,
}
