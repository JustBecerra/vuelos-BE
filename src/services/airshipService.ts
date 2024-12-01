import { Dropbox } from "dropbox"
import db from "../config/dbConfig"
import { Client } from "node-scp"
const { Airships, Images, Schedulers } = db
import fs from "fs"
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
		// Create a new airship entry in the database
		const newAirship = await Airships.create({
			title,
			status,
			pricepermile,
			seats,
			size,
		})

		if (!newAirship) throw new Error("Airship creation failed")

		const airshipID = newAirship.dataValues.id

		// SCP Configuration
		const scpClient = await Client({
			host: "vuelos-be.onrender.com",
			port: 22,
			username: "justin", // or your specific user
			privateKey: fs.readFileSync("C:/Users/Justo/.ssh/id_rsa"), // or SSH key auth
		})

		const uploadDirectory = "/var/data" // Path on Render's persistent disk

		// Ensure the upload directory exists on the Render server
		for (const file of images) {
			try {
				// Upload the file to Render using SCP
				const remoteFilePath = `${uploadDirectory}/${file.originalname}`
				await scpClient.uploadFile(file.path, remoteFilePath) // Use file.path for local file

				// Store the file path in the database
				await Images.create({
					image_url: `/uploads/${file.originalname}`, // URL relative to your static file server
					airship_id: airshipID,
					local_path: remoteFilePath, // Path on the server
				})
			} catch (error) {
				console.error(
					`Error uploading file ${file.originalname}:`,
					error
				)
				continue
			}
		}

		// Close the SCP client after the operation
		await scpClient.close()

		return newAirship
	} catch (err) {
		console.error("Error in postAirshipService:", err)
		return null
	}
}

const putAirshipService = async (
	airship: airshipProps,
	images: Express.Multer.File[],
	currentUserId: number
) => {
	const { id, title, status, pricepermile, seats, size } = airship
	try {
		const AccessToken = await Schedulers.findOne({
			where: {
				id: currentUserId,
			},
		}).then((response) => response?.dataValues.access_token)

		const dbx = new Dropbox({
			accessToken: AccessToken,
			fetch: fetch,
		})

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

		if (images) {
			// for (const oldFile of AirshipImages) {
			// 	await dbx.filesDeleteV2({
			// 		path: oldFile.dataValues.dropbox_path,
			// 	})

			// 	await Images.destroy({
			// 		where: {
			// 			dropbox_path: oldFile.dataValues.dropbox_path,
			// 		},
			// 	})
			// }

			for (const file of images) {
				try {
					// chequear si el archivo existe antes de subirlo
					try {
						const metadata = await dbx.filesGetMetadata({
							path: `/tangoJets/${file.originalname}`,
						})
						continue // saltear una vuelta en el loop si ya existe
					} catch (err) {
						console.log(
							"File does not exist, proceeding with upload..."
						)
					}

					// Subir archivo
					const response = await dbx.filesUpload({
						path: `/tangoJets/${file.originalname}`,
						contents: file.buffer,
					})

					// Chequear por links ya existentes
					const existingLinks = await dbx.sharingListSharedLinks({
						path: response.result.path_display,
						direct_only: true,
					})

					let sharedLink = ""
					if (existingLinks.result.links.length > 0) {
						sharedLink = existingLinks.result.links[0].url.replace(
							"dl=0",
							"raw=1"
						) //supuestamente necesito cambiar eso en la url para guardarlo
					} else {
						if (response.result.path_display) {
							const sharedLinkResponse =
								await dbx.sharingCreateSharedLinkWithSettings({
									path: response.result.path_display,
								})
							sharedLink = sharedLinkResponse.result.url.replace(
								"dl=0",
								"raw=1"
							)
						}
					}

					// if (response.result.path_display) {
					// 	await Images.create({
					// 		image_url: sharedLink,
					// 		airship_id: Airship?.dataValues.id as number,
					// 		dropbox_path: response.result.path_display,
					// 	})
					// }
				} catch (error) {
					console.error("Error processing file:", error)
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
		const airship = await Airships.findByPk(airshipID)

		if (airship) {
			const deleteAirship = await airship.destroy()
			return deleteAirship
		} else {
			return 0
		}
	} catch (err) {
		console.error(err)
		throw new Error("Airship deletion wasn't possible")
	}
}


export {
	getAirshipsService,
	postAirshipService,
	putAirshipService,
	deleteAirshipService,
}
