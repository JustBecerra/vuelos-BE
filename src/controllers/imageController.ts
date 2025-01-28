import { Request, Response } from "express"
import { deleteImageByID, getImagesService } from "../services/imageService"

const getImages = async (req: Request, res: Response) => {
	try {
		const id = req.params.id
		const images = await getImagesService(id)

		if (images === "Airship does not exist") {
			res.status(400).json({ message: "Airship does not exist" })
		}

		if (images && images.length === 0) {
			res.status(400)
		}

		if (images && images.length > 0) {
			res.status(200).json(images)
		}
	} catch (error) {
		res.status(500).json({
			message: "Error getting images",
			error: {
				name: (error as Error).name,
				message: (error as Error).message,
				stack: (error as Error).stack,
			},
		})
	}
}

const deleteImage = async (req: Request, res: Response) => {
	try {
		const id = req.params.id
		const imageD = await deleteImageByID(id)

		if (imageD === 0) {
			res.status(400).json({ message: "Image deletion failed" })
		} else {
			res.status(200).json({ message: "Image updated successfully" })
		}
	} catch (error) {
		res.status(500).json({
			message: "Error deleting Image",
			error: {
				name: (error as Error).name,
				message: (error as Error).message,
				stack: (error as Error).stack,
			},
		})
	}
}

export { getImages, deleteImage }
