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

const getClientByIdService = async (clientId: number) => {
    try {
        const client = await Clients.findByPk(clientId)
        if (!client) {
            throw new Error("Client not found")
        }
        return client
    } catch (error) {
        console.error("Error fetching client:", error)
        throw error
    }
}

const getClientService = async () => {
	try {
		const client = await Clients.findAll()

		if (!client) throw new Error("There are no clients scheduled")

		return client
	} catch (err) {
		console.error(err)
		return null
	}
}

const putClientService = async (client: ClientInterface) => {
	const { id, firstname, lastname, email, phonenumber, identification } =
		client
	try {
		const oldClient = await Clients.findByPk(id)

		if (oldClient) {
			const clientToModify = await Clients.update(
				{
					firstname,
					lastname,
					email,
					phonenumber,
					identification,
				},
				{
					where: {
						id,
					},
				}
			)
			if (clientToModify[0] < 1) return 0
			return clientToModify
		} else {
			return 0
		}
	} catch (err) {
		console.error(err)
		return null
	}
}

const deleteClientService = async (clientId: number) => {
	try {
		const deleteAirship = await Clients.destroy({
			where: {
				id: clientId,
			},
		})

		return deleteAirship
	} catch (err) {
		console.error(err)
		throw new Error("client deletion wasnt possible")
	}
}

export {
	associateFlightWithClient,
	postClientService,
	getClientByIdService,
	getClientService,
	putClientService,
	deleteClientService,
}
