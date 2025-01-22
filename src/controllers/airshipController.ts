import { Request, Response } from "express"
import {
	getAirshipsService,
	postAirshipService,
	putAirshipService,
	deleteAirshipService,
} from "../services/airshipService"


const getAirships = async (req: Request, res: Response) => {
	try {
		const airships = await getAirshipsService()

		if (!airships) {
			res.status(204)
		}
		res.status(200).json(airships)
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

const postAirship = async (req: Request, res: Response): Promise<void> => {
	try {
		const airshipData = req.body
		const files = req.files as {
			[fieldname: string]: Express.Multer.File[]
		}

		const portraitFile = files.portrait[0] || null
		const genericFiles = files.generic || []

		const airship = await postAirshipService(
			airshipData,
			genericFiles,
			portraitFile
		)

		if (!airship) {
			res.status(400).json({ error: "no airship was added" })
			return
		}
		res.status(200).json(airship)
	} catch (error) {
		res.status(500).json({
			message: "Error creating airships",
			error: {
				name: (error as Error).name,
				message: (error as Error).message,
				stack: (error as Error).stack,
			},
		})
	}
}

const putAirship = async (req: Request, res: Response) => {
	try {
		const airshipData = req.body
		const files = req.files as {
			[fieldname: string]: Express.Multer.File[]
		}

		const portraitFile = files.portrait[0] || null
		const genericFiles = files.generic || []
		const airship = await putAirshipService(
			airshipData,
			portraitFile,
			genericFiles
		)

		if (airship === 0) {
			res.status(400).json({ message: "Airship update failed" })
		} else {
			res.status(200).json({ message: "Airship updated successfully" })
		}
	} catch (error) {
		res.status(500).json({
			message: "Error modifying airships",
			error: {
				name: (error as Error).name,
				message: (error as Error).message,
				stack: (error as Error).stack,
			},
		})
	}
}

const deleteAirship = async (req: Request, res: Response) => {
	try {
		const id = parseInt(req.params.id)
		const airship = await deleteAirshipService(id)

		if (airship === 0) {
			res.status(400).json({ message: "Airship deletion failed" })
		} else {
			res.status(200).json({ message: "Airship deleted successfully" })
		}
	} catch (error) {
		res.status(500).json({
			message: "Error deleting airship",
			error: {
				name: (error as Error).name,
				message: (error as Error).message,
				stack: (error as Error).stack,
			},
		})
	}
}

export { getAirships, postAirship, putAirship, deleteAirship }
