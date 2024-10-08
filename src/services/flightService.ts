import db from "../config/dbConfig"
import { Op } from "sequelize"
const { Flights, Schedulers, Airships, ClientFlights } = db
interface FlightInput {
	id: number
	launchtime: Date
	arrivaltime: Date
	to: string
	from: string
	airship_id: number
	createdby: number
}

const postFlightService = async (flight: FlightInput) => {
	try {
		const { id, launchtime, arrivaltime, to, from, airship_id, createdby } =
			flight

		const schedulerID = await Schedulers.findByPk(createdby)
		const airshipID = await Airships.findByPk(airship_id)

		if (!schedulerID) throw new Error("Scheduler does not exist")

		if (schedulerID?.dataValues.role !== "admin")
			throw new Error("Scheduler is not an admin.")

		if (!airshipID) throw new Error("Airship does not exist.")

		const newFlight = await Flights.create({
			id,
			launchtime,
			arrivaltime,
			to,
			from,
			airship_id,
			createdby,
		})

		if (!newFlight) throw new Error("Flight creation went wrong")

		return newFlight
	} catch (err) {
		console.error(err)
		return null
	}
}

const getFlightsService = async () => {
	try {
		const flights = await Flights.findAll()

		if (!flights) throw new Error("There are no flights scheduled")

		return flights
	} catch (err) {
		console.error(err)
		return null
	}
}

const getFlightByIdService = async (id: number) => {
	try {
		const flightById = await Flights.findByPk(id)

		if (!flightById) throw new Error("There is no flight with that ID")

		return flightById
	} catch (err) {
		console.error(err)
		return null
	}
}

const getFlightByClientIdService = async (clientID: number) => {
	try {
		const clientsFlights = await ClientFlights.findAll({
			where: {
				clientId: clientID,
			},
		})

		if (!clientsFlights) return []

		const flightIDs = clientsFlights.map((flight) => flight.dataValues.flightId)

		const flights = await Flights.findAll({
			where: {
				id: {
					[Op.in]: flightIDs,
				},
			},
		})

		if (!flights.length) return []
		return flights
	} catch (err) {
		console.error(err)
		return err
	}
}

export {
	postFlightService,
	getFlightsService,
	getFlightByIdService,
	getFlightByClientIdService,
}
