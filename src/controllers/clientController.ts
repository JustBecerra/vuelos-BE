import { Request, Response } from "express"
import {
	associateFlightWithClient,
	postClientService,
	getClientByIdService,
	getClientService,
	putClientService,
	deleteClientService,
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

const getClientById = async (req: Request, res: Response) => {
	const { clientId } = req.params
	const parsedClientId = parseInt(clientId)
	try {
		const client = await getClientByIdService(parsedClientId)
		res.status(200).json(client)
	} catch (error) {
		console.error("Error fetching client", error)
		res.status(500).json({ message: "Error fetching client" })
	}
}

const getClient = async (req: Request, res: Response): Promise<void> => {
	try {
		const clients = await getClientService()
		res.status(200).json(clients)
	} catch (error) {
		console.error("error getting clients", error)
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

const putClient = async (req: Request, res: Response) => {
	try {
		const client = await putClientService(req.body)

		if (client === 0) {
			res.status(400).json({ message: "Airship update failed" })
		} else {
			res.status(200).json({ message: "Airship updated successfully" })
		}
	} catch (error) {
		console.error("error editing client", error)
		res.status(500).json({
			message: "Error editing client",
			error: {
				name: (error as Error).name,
				message: (error as Error).message,
				stack: (error as Error).stack,
			},
		})
	}
}

const deleteClient = async (req: Request, res: Response) => {
	try {
		const client = await deleteClientService(parseInt(req.params.id))

		if (client === 0) {
			res.status(400).json({ message: "Client deletion failed" })
		} else {
			res.status(200).json({ message: "Client updated successfully" })
		}
	} catch (error) {
		console.error("error editing client", error)
		res.status(500).json({
			message: "Error editing client",
			error: {
				name: (error as Error).name,
				message: (error as Error).message,
				stack: (error as Error).stack,
			},
		})
	}
}

export {
	postClientFlight,
	postClient,
	getClientById,
	getClient,
	putClient,
	deleteClient,
} 
