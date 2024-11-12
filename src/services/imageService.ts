import db from "../config/dbConfig"
const { Images } = db

const getImagesService = async (id: string) => {
	try {
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
