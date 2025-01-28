import db from "../config/dbConfig"
const { Images, Airships } = db

const getImagesService = async (id: string) => {
	try {
		const airship = await Airships.findOne({
			where: {
				id,
			},
		})

		if (!airship) return "Airship does not exist"

		const images = await Images.findAll({
			where: {
				airship_id: id,
			},
		})

		return images
	} catch (err) {
		console.error(err)
		return null
	}
}

const deleteImageByID = async (id: string) => {
	try {
		const deleteImage = await Images.destroy({
			where: {
				id,
			},
		})

		return deleteImage
	} catch (err) {
		console.error(err)
		return null
	}
}

export { getImagesService, deleteImageByID }
