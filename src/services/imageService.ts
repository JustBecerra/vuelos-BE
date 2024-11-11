import db from "../config/dbConfig"
const { Images } = db

const getImagesService = async (id: string) => {
	try {
		const images = await Images.findAll()

		if (!images) throw new Error("image is not available")

		return images
	} catch (err) {
		console.error(err)
		return null
	}
}

export { getImagesService }
