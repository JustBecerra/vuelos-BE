import { getPilotsService, postPilotService } from "../services/pilotService"
import { Request, Response } from "express"

const getPilots = async (req: Request, res: Response): Promise<void> => {
	try {
		const pilots = await getPilotsService()
		res.status(200).json(pilots)
	} catch (err) {
		res.status(500).json({ message: "could not retrive pilots", err })
	}
}

const postPilot = async (req: Request, res: Response): Promise<void> => {
	try {
		const pilot = await postPilotService(req.body)
		if (pilot === "Pilot already exists")
			res.status(400).json({ message: "Pilot already exists" })
		res.status(200).json(pilot)
	} catch (err) {
		res.status(500).json({ message: "could not post pilot", err })
	}
}

export { getPilots, postPilot }
