import { Request, Response } from "express"
import { getFileService, postFileService } from "../services/fileService"

const postFile = async (req: Request, res: Response): Promise<void> => {
	try {
		const contractFile = req.file

		const filesSuccess = await postFileService(
			contractFile as Express.Multer.File
		)
		if (!filesSuccess) res.status(400).json({ error: filesSuccess })
		else res.status(200).json(filesSuccess)
	} catch (error) {
		console.error("error adding new file", error)
		res.status(500).json({
			message: "error adding new file",
			error: {
				name: (error as Error).name,
				message: (error as Error).message,
				stack: (error as Error).stack,
			},
		})
	}
}

const getFile = async (req: Request, res: Response): Promise<void> => {
	try {
		const files = await getFileService()

		if (!files) {
			res.status(204)
		}
		res.status(200).json(files)
	} catch (error) {
		console.error("error getting file", error)
		res.status(500).json({
			message: "error getting file",
			error: {
				name: (error as Error).name,
				message: (error as Error).message,
				stack: (error as Error).stack,
			},
		})
	}
}

export { postFile, getFile }