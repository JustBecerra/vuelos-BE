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
const dbx = new Dropbox({
	accessToken: process.env.ACCESS_TOKEN,
	fetch: fetch,
})
const postAirshipService = async (
	airship: airshipProps,
	images: Express.Multer.File[]
) => {
	const { title, status, pricepermile, seats, size } = airship
	try {
		if (!process.env.ACCESS_TOKEN) {
			throw new Error("Dropbox access token is missing or undefined")
		}

		const newAirship = await Airships.create({
			title,
			status,
			pricepermile,
			seats,
			size,
		})

		if (!newAirship) throw new Error("Airship creation failed")

		const getAirshipID = await Airships.findOne({ where: { title } })

		if (!getAirshipID) {
			console.error("Airship not found")
			return null
		}

		for (const file of images) {
			let response
			try {
				response = await dbx.filesUpload({
					path: `/tangoJets/${file.originalname}`,
					contents: file.buffer,
				})
			} catch (error) {
				console.error("Error uploading file:", error)
				continue
			}

			let sharedLink
			let urlForDeletion = ""

			if (response?.result?.path_display) {
				try {
					const sharedLinkResponse =
						await dbx.sharingCreateSharedLinkWithSettings({
							path: response.result.path_display,
						})

					sharedLink = sharedLinkResponse.result.url.replace(
						"dl=0",
						"raw=1"
					)
					urlForDeletion = response.result.path_display
				} catch (error: any) {
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
						urlForDeletion = response.result.path_display
					} else {
						console.error("Error creating shared link:", error)
						continue
					}
				}

				await Images.create({
					image_url: sharedLink,
					airship_id: getAirshipID.dataValues.id,
					dropbox_path: urlForDeletion,
				})
			}
		}

		return newAirship
	} catch (err) {
		console.error("Error in postAirshipService:", err)
		return null
	}
}

const putAirshipService = async (
	airship: airshipProps,
	images: Express.Multer.File[]
) => {
	const { id, title, status, pricepermile, seats, size } = airship
	try {
		const Airship = await Airships.findOne({
			where: {
				id,
			},
		})
		const AirshipImages = await Images.findAll({
			where: {
				airship_id: Airship?.dataValues.id,
			},
		})

		if (images.length > 0) {
			for (const oldFile of AirshipImages) {
				await dbx.filesDeleteV2({
					path: oldFile.dataValues.dropbox_path,
				})

				await Images.destroy({
					where: {
						dropbox_path: oldFile.dataValues.dropbox_path,
					},
				})
			}

			for (const file of images) {
				let response
				try {
					response = await dbx.filesUpload({
						path: `/tangoJets/${file.originalname}`,
						contents: file.buffer,
					})
				} catch (error) {
					console.error("Error uploading file:", error)
					continue
				}

				let sharedLink
				let urlForDeletion = ""

				if (response?.result?.path_display) {
					try {
						const sharedLinkResponse =
							await dbx.sharingCreateSharedLinkWithSettings({
								path: response.result.path_display,
							})

						sharedLink = sharedLinkResponse.result.url.replace(
							"dl=0",
							"raw=1"
						)
						urlForDeletion = response.result.path_display
					} catch (error: any) {
						if (
							error.error &&
							error.error[".tag"] === "shared_link_already_exists"
						) {
							const existingLinkResponse =
								await dbx.sharingGetSharedLinkMetadata({
									url: `https://www.dropbox.com/home${response.result.path_display}`,
								})

							sharedLink =
								existingLinkResponse.result.url.replace(
									"dl=0",
									"raw=1"
								)
							urlForDeletion = response.result.path_display
						} else {
							console.error("Error creating shared link:", error)
							continue
						}
					}

					await Images.create({
						image_url: sharedLink,
						airship_id: Airship?.dataValues.id as number,
						dropbox_path: urlForDeletion,
					})
				}
			}
		}

		if (Airship) {
			const airshipToModify = await Airships.update(
				{
					title: title || Airship.dataValues.title,
					status: status || Airship.dataValues.status,
					pricepermile:
						pricepermile || Airship.dataValues.pricepermile,
					seats: seats || Airship.dataValues.seats,
					size: size || Airship.dataValues.size,
				},
				{
					where: {
						id: Airship.dataValues.id,
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
