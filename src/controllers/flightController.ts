import { Request, Response } from "express"
import {
	postFlightService,
	getFlightsService,
	getFlightByIdService,
	getFlightByClientIdService,
	putFlightService,
} from "../services/flightService"

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

const putFlight = async (req: Request, res: Response) => {
	try {
		const flight = await putFlightService(req.body)
		res.status(200).json(flight)
	} catch (error) {
		console.error("error editing flight", error)
		res.status(500).json({
			message: "Error editing flight",
			error: {
				name: (error as Error).name,
				message: (error as Error).message,
				stack: (error as Error).stack,
			},
		})
	}
}

const getFlights = async (req: Request, res: Response): Promise<void> => {
	try {
		const flights = await getFlightsService()
		res.status(200).json(flights)
	} catch (error) {
		console.error("error getting flights", error)
		res.status(500).json({
			message: "Error getting flights",
			error: {
				name: (error as Error).name,
				message: (error as Error).message,
				stack: (error as Error).stack,
			},
		})
	}
}

const getFlightById = async (req: Request, res: Response): Promise<void> => {
	try {
		const flightID = parseInt(req.params.id)
		const flight = await getFlightByIdService(flightID)
		res.status(200).json(flight)
	} catch (error) {
		console.error("error getting flight by id", error)
		res.status(500).json({
			message: "Error getting flight by id",
			error: {
				name: (error as Error).name,
				message: (error as Error).message,
				stack: (error as Error).stack,
			},
		})
	}
}

const getFlightByClientId = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const clientID = parseInt(req.params.id)
		const flights = await getFlightByClientIdService(clientID)

		if (Array.isArray(flights) && flights.length === 0) {
			res.status(404).json({
				message: "No flights found for this client",
			}) // capaz tenemos que borrar el mensaje con .json
		}
		res.status(200).json(flights)
	} catch (error) {
		console.error("error getting flights by client id", error)
		res.status(500).json({
			message: "Error getting flights by client id",
			error: {
				name: (error as Error).name,
				message: (error as Error).message,
				stack: (error as Error).stack,
			},
		})
	}
}

export { postFlight, getFlights, getFlightById, getFlightByClientId, putFlight }
