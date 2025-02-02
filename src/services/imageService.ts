import sharp from "sharp"
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

		const convertedImages = await Promise.all(
			images.map(async (image) => {
				const newImage = (
					await sharp(image.dataValues.image).png().toBuffer()
				).toString("base64")
				return {
					...image,
					dataValues: {
						...image.dataValues,
						image: `data:image/png;base64,${newImage}`,
					},
				}
			})
		)

		return convertedImages
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
