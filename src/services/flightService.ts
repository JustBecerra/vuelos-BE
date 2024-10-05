import db from "../config/dbConfig" // Default import

import { FlightAttributes } from "../models/Flight"
const { Flights } = db // Destructure the Flights model
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

export { postFlightService }
