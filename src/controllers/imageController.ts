import { Request, Response } from "express"
import { getImagesService } from "../services/imageService"

const getImages = async (req: Request, res: Response) => {
	try {
		const id = req.params.id
		const images = await getImagesService(id)

		if (!images) {
			res.status(204)
		}
		res.status(200).json(images)
	} catch (error) {
		res.status(500).json({
			message: "Error getting clients",
			error: {
				name: (error as Error).name,
				message: (error as Error).message,
				stack: (error as Error).stack,
			},
		})
	}
}

export { getImages }
