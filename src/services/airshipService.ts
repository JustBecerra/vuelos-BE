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
	genericFiles: Express.Multer.File[],
	portraitFile: Express.Multer.File
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

		const filteredImages = genericFiles.filter((value, index, self) => {
			const originalName = value.originalname.trim().toLowerCase()
			const firstOccurrenceIndex = self.findIndex(
				(item) =>
					item.originalname.trim().toLowerCase() === originalName
			)

			return firstOccurrenceIndex === index // Keep only the first occurrence
		})

		if (portraitFile) {
			await Images.create({
				image: portraitFile.buffer,
				airship_id: airshipID,
				local_path: "",
			})
		}

		// Ensure the upload directory exists on the Render server
		for (const file of filteredImages) {
			try {
				// Store the file path in the database
				await Images.create({
					image: file.buffer, // URL relative to your static file server
					airship_id: airshipID,
					local_path: "", // Path on the server
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
	images: Express.Multer.File[]
) => {
	const { id, title, status, pricepermile, seats, size } = airship
	try {
		const Airship = await Airships.findOne({
			where: {
				id,
			},
		})

		if (images) {
			await Images.destroy({
				where: {
					airship_id: Airship?.dataValues.id as number,
				},
			})
			for (const file of images) {
				try {
					await Images.create({
						image: file.buffer,
						airship_id: Airship?.dataValues.id as number,
						local_path: "",
					})
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
