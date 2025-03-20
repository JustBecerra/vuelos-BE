import db from "../config/dbConfig"
import { Op } from "sequelize"
const { Airships, Images } = db

interface airshipProps {
	id: number
	title: string
	status: string
	description: string
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

const getAirshipsInvoiceService = async (IDs: string[]) => {
	try {
		const convertedIDs = IDs.map((id) => parseInt(id, 10))
		const airships = await Airships.findAll({
			where: {
				id: {
					[Op.in]: convertedIDs,
				},
			},
		})

		if (!airships) throw new Error("There are no airships available")

		return airships
	} catch (err) {
		console.error(err)
		return null
	}
}

const postAirshipService = async (
	airship: airshipProps,
	genericFiles: Express.Multer.File[],
	portraitFile: Express.Multer.File
) => {
	const { title, status, description, seats, size } = airship

	try {
		const newAirship = await Airships.create({
			title,
			status,
			description,
			seats,
			size,
		})

		if (!newAirship) throw new Error("Airship creation failed")

		const airshipID = newAirship.dataValues.id

		const filteredImages = genericFiles.filter((value, index, self) => {
			const originalName = value.originalname.trim().toLowerCase()
			const firstOccurrenceIndex = self.findIndex(
				(item) =>
					item.originalname.trim().toLowerCase() === originalName
			)

			return firstOccurrenceIndex === index
		})

		if (portraitFile) {
			try {
				await Images.create({
					image: portraitFile.buffer,
					airship_id: airshipID,
					typeof: "Portrait",
					original_name: portraitFile.originalname,
				})
			} catch (error) {
				console.error(
					`Error uploading file ${portraitFile.originalname}:`,
					error
				)
			}
		}

		for (const file of filteredImages) {
			try {
				await Images.create({
					image: file.buffer,
					airship_id: airshipID,
					typeof: "Generic",
					original_name: file.originalname,
				})
			} catch (error) {
				console.error(
					`Error uploading file ${file.originalname}:`,
					error
				)
				continue
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
	portraitFile: Express.Multer.File,
	genericFiles: Express.Multer.File[]
) => {
	const { id, title, status, description, seats, size } = airship
	try {
		const Airship = await Airships.findOne({
			where: {
				id,
			},
		})

		const filteredImages = genericFiles.filter((value, index, self) => {
			const originalName = value.originalname.trim().toLowerCase()
			const firstOccurrenceIndex = self.findIndex(
				(item) =>
					item.originalname.trim().toLowerCase() === originalName
			)

			return firstOccurrenceIndex === index
		})

		const oldImages = await Images.findAll({
			where: {
				airship_id: id,
				typeof: "Generic",
			},
		})

		for (let i = 0; i < filteredImages.length; i++) {
			const file = filteredImages[i]

			if (i < oldImages.length) {
				// Update existing image
				await oldImages[i].update({
					image: file.buffer,
					original_name: file.originalname,
				})
			} else {
				// Create new image if there are more new images than old ones
				await Images.create({
					image: file.buffer,
					airship_id: id,
					typeof: "Generic",
					original_name: file.originalname,
				})
			}
		}

		if (oldImages.length > filteredImages.length) {
			const imagesToDelete = oldImages.slice(filteredImages.length)
			for (const image of imagesToDelete) {
				await image.destroy()
			}
		}

		if (portraitFile) {
			try {
				const updatedPortrait = await Images.update(
					{
						image: portraitFile.buffer,
						original_name: portraitFile.originalname,
					},
					{
						where: {
							airship_id: id,
							typeof: "Portrait",
						},
					}
				)
				if (updatedPortrait[0] === 0) {
					await Images.create({
						image: portraitFile.buffer,
						airship_id: id,
						typeof: "Portrait",
						original_name: portraitFile.originalname,
					})
				}
			} catch (error) {
				console.error(
					`Error uploading file ${portraitFile.originalname}:`,
					error
				)
			}
		}

		if (Airship) {
			const airshipToModify = await Airships.update(
				{
					title: title || Airship.dataValues.title,
					status: status || Airship.dataValues.status,
					description: description || Airship.dataValues.description,
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
	getAirshipsInvoiceService,
}
