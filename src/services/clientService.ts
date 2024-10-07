import db from "../config/dbConfig"
const { Flights, Clients } = db

const associateFlightWithClient = async (
	clientId: number,
	flightId: number
) => {
	try {
		const client = await Clients.findByPk(clientId)
		const flight = await Flights.findByPk(flightId)

		if (client && flight) {
			await client.addFlight(flight) // need to find out how to make this works
			return { message: "Flight successfully associated with client" }
		} else {
			throw new Error("Client or Flight not found")
		}
	} catch (error) {
		console.error("Error associating flight with client:", error)
		throw new Error("Error associating flight")
	}
}

export { associateFlightWithClient }
