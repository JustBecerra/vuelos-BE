import { Request, Response } from "express"
import {
	associateFlightWithClient,
	postClientService,
} from "../services/clientService"

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

const postClient = async (req: Request, res: Response) => {
	try {
		const client = await postClientService(req.body)
		res.status(200).json(client)
	} catch (error) {
		console.error("Error creating client", error)
		res.status(500).json({ message: "Error creating client" })
	}
}

export { postClientFlight, postClient }
