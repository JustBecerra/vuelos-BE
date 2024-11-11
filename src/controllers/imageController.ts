import { Request, Response } from "express"
import { deleteImageByID, getImagesService } from "../services/imageService"

const getImage = async (req: Request, res: Response) => {
	try {
		const id = req.params.id
		const images = await getImagesService(id)

		if (!images) {
			res.status(204)
		}
		res.status(200)
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

export { getImage, deleteImage }
