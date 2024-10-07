import { Request, Response } from "express"
import { associateFlightWithClient } from "../services/clientService"

const postClientFlight = async (req: Request, res: Response) => {
	const { clientId, flightId } = req.params
	const parsedClientId = parseInt(clientId)
	const parsedFlightId = parseInt(flightId)
	try {
		const result = await associateFlightWithClient(
			parsedClientId,
			parsedFlightId
		)
		res.status(200).json(result)
	} catch (error) {
		console.error("Error linking flight to client:", error)
		res.status(500).json({ message: "Server error" })
	}
}

export { postClientFlight }
