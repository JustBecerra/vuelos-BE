import { Request, Response } from "express"
import { getAirshipsService } from "../services/airshipService"

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

export { getAirships }
