import db from "../config/dbConfig"
const { Flights, Clients } = db

interface ClientInterface {
	id: number
	firstname: string
	lastname: string
	email: string
	phonenumber: string
	identification: string
}

const associateFlightWithClient = async (
	clientId: number,
	flightId: number
) => {
	try {
		const client = await Clients.findByPk(clientId)
		const flight = await Flights.findByPk(flightId)

		if (client && flight) {
			await client.addFlight(flight)
			return { message: "Flight successfully associated with client" }
		} else {
			console.error("Client or Flight not found")
		}
	} catch (error) {
		console.error("Error associating flight with client:", error)
	}
}

const postClientService = async (client: ClientInterface) => {
	const { firstname, lastname, email, phonenumber, identification } = client
	try {
		const newClient = await Clients.create({
			firstname,
			lastname,
			email,
			phonenumber,
			identification,
		})

		if (!newClient) throw new Error("client creation went wrong")

		return newClient
	} catch (error) {
		console.error("Error creating client on service", error)
	}
}

export { associateFlightWithClient, postClientService }
