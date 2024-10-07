import { Request, Response } from "express"
import { postFlightService } from "../services/flightService"

const postFlight = async (req: Request, res: Response): Promise<void> => {
	try {
		const flight = await postFlightService(req.body)
		res.status(200).json(flight)
	} catch (error) {
		console.error("error adding new flight", error)
		res.status(500).json({
			message: "Error creating flight",
			error: {
				name: (error as Error).name,
				message: (error as Error).message,
				stack: (error as Error).stack,
			},
		})
	}
}

export { postFlight }
