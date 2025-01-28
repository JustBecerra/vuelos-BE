import { getPilotsService } from "../services/pilotService"
import { Request, Response } from "express"

const getPilots = async (req: Request, res: Response): Promise<void> => {
	try {
		const pilots = await getPilotsService()
		res.status(200).json(pilots)
	} catch (err) {
		res.status(500).json({ message: "could not retrive pilots", err })
	}
}

export { getPilots }
