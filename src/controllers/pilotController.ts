import {
	deletePilotService,
	getPilotsService,
	postPilotService,
	putPilotService,
} from "../services/pilotService"
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

const putPilot = async (req: Request, res: Response): Promise<void> => {
	try {
		const pilot = await putPilotService(req.body)

		if (pilot === 0) {
			res.status(400).json({ message: "Pilot doesnt exist" })
		} else {
			res.status(200).json(pilot)
		}
	} catch (err) {
		res.status(500).json({ message: "could not edit pilot", err })
	}
}

const deletePilot = async (req: Request, res: Response): Promise<void> => {
	try {
		const { id } = req.params
		const pilot = await deletePilotService(id)
		if (pilot === "Pilot does not exist")
			res.status(400).json({ message: "Pilot does not exist" })
		res.status(200).json(pilot)
	} catch (err) {
		res.status(500).json({ message: "could not delete pilot", err })
	}
}

export { getPilots, postPilot, deletePilot, putPilot }
