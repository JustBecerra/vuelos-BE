import db from "../config/dbConfig"
import { Op } from "sequelize"
const { Flights, Schedulers, Airships, ClientFlights, Clients } = db
interface FlightInput {
	id: number
	launchtime: Date
	arrivaltime: Date
	to: string
	from: string
	price_cost: number
	price_revenue: number
	airship_name: string
	createdby: string
	master_passenger: string
	companion_passengers: string
	phase: number
	type_of: string
	associated_to: string
}

interface confirmationProps {
	airship_id: number
	price_revenue: number
	price_cost: number
	flight_id: number
}

const postFlightService = async (flight: FlightInput) => {
	try {
		const {
			launchtime,
			arrivaltime,
			to,
			from,
			createdby,
			master_passenger,
			associated_to,
			type_of,
		} = flight

		const scheduler = await Schedulers.findOne({
			where: {
				username: createdby,
			},
		})

		if (!scheduler) return "Scheduler does not exist"

		const scheduler_id = scheduler.dataValues.id
		if (scheduler.dataValues.role !== "admin") {
			return "Scheduler is not an admin."
		}

		const masterPassenger = await Clients.findOne({
			where: {
				fullname: master_passenger,
			},
		}).then((res) => res?.dataValues.id)

		if (masterPassenger) {
			const newFlight = await Flights.create({
				launchtime,
				arrivaltime: arrivaltime || new Date(launchtime).setHours(3),
				to,
				from,
				price_cost: 0,
				price_revenue: 0,
				airship_id: 32,
				createdby: scheduler_id,
				master_passenger: masterPassenger,
				companion_passengers: [],
				phase: 3,
				type_of: type_of || "initial",
				associated_to: associated_to || "",
			})

			if (!newFlight) return "Flight creation went wrong"

			return newFlight
		}

		return "Flight doesnt have passengers"
	} catch (err) {
		console.error(err)
		return null
	}
}

const deleteFlightService = async (id: number) => {
	try {
		const deleteFlight = await Flights.destroy({
			where: {
				id,
			},
		})

		return deleteFlight
	} catch (err) {
		console.error(err)
		return null
	}
}

const putFlightService = async (flight: FlightInput) => {
	const {
		id,
		launchtime,
		arrivaltime,
		to,
		from,
		price_cost,
		price_revenue,
		airship_name,
		master_passenger,
		companion_passengers,
		type_of,
		associated_to,
	} = flight
	try {
		const oldFlight = await Flights.findOne({
			where: {
				id,
			},
		})
		const parsedCompanionPassengers = JSON.parse(companion_passengers)
		if (oldFlight) {
			const airship = await Airships.findOne({
				where: {
					title: airship_name,
				},
			})

			if (!airship) return "Airship does not exist."

			const airship_id = airship?.dataValues.id
			const masterPassenger = await Clients.findOne({
				where: {
					fullname: master_passenger,
				},
			}).then((res) => res?.dataValues.id)

			const flightToModify = await Flights.update(
				{
					launchtime: launchtime || oldFlight.dataValues.launchtime,
					arrivaltime:
						arrivaltime || oldFlight.dataValues.arrivaltime,
					to: to || oldFlight.dataValues.to,
					from: from || oldFlight.dataValues.from,
					price_cost: price_cost || oldFlight.dataValues.price_cost,
					price_revenue:
						price_revenue || oldFlight.dataValues.price_revenue,
					airship_id: airship_id || oldFlight.dataValues.airship_id,
					createdby: oldFlight.dataValues.createdby,
					master_passenger:
						masterPassenger ||
						oldFlight.dataValues.master_passenger,
					companion_passengers:
						parsedCompanionPassengers ||
						oldFlight.dataValues.companion_passengers,
					phase: oldFlight.dataValues.phase,
					type_of: type_of || oldFlight.dataValues.type_of,
					associated_to:
						associated_to || oldFlight.dataValues.associated_to,
				},
				{
					where: {
						id,
					},
				}
			)
			if (flightToModify[0] < 1) return 0
			return flightToModify
		} else {
			return 0
		}
	} catch (err) {
		console.error(err)
		return null
	}
}

const getAlteredValues = async (createdby: string, id: number) => {
	const schedulerFound = (await Schedulers.findByPk(createdby))?.dataValues
		.username
	const airshipName = (await Airships.findByPk(id))?.dataValues.title
	return { schedulerFound, airshipName }
}

const putCompletePhaseService = async ({
	convertedID,
	convertedPhaseNumber,
}: {
	convertedID: number
	convertedPhaseNumber: number
}) => {
	try {
		const modifiedFlightPhase = await Flights.update(
			{
				phase: convertedPhaseNumber,
			},
			{
				where: {
					id: convertedID,
				},
			}
		)

		return modifiedFlightPhase
	} catch (err) {
		console.error(err)
		return null
	}
}

const getFlightsService = async () => {
	try {
		const flights = await Flights.findAll()

		if (!flights) throw new Error("There are no flights scheduled")
		const filteredDataPromises = flights.map(async (flight: any) => {
			const {
				launchtime,
				createdAt,
				updatedAt,
				createdby,
				airship_id,
				master_passenger,
				companion_passengers,
				...rest
			} = flight.toJSON()

			const masterPassenger = await Clients.findByPk(master_passenger)

			return getAlteredValues(createdby, airship_id).then(
				(alteredData) => ({
					launchtime: new Date(launchtime).toISOString().slice(0, 16),
					createdAt: new Date(createdAt).toISOString().slice(0, 16),
					updatedAt: new Date(updatedAt).toISOString().slice(0, 16),
					createdby: alteredData?.schedulerFound,
					airship_name: alteredData?.airshipName,
					master_passenger:
						masterPassenger && masterPassenger?.dataValues.fullname,
					...rest,
				})
			)
		})
		const filteredData = await Promise.all(filteredDataPromises)

		return filteredData
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

		const flightIDs = clientsFlights.map(
			(flight) => flight.dataValues.flightId
		)

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

const putConfirmQuoteService = async (data: confirmationProps) => {
	try {
		const { airship_id, price_revenue, price_cost, flight_id } = data

		const flight = await Flights.findByPk(flight_id)

		if (!flight) return "Flight does not exist"

		const updatedFlight = await Flights.update(
			{
				airship_id,
				price_revenue,
				price_cost,
			},
			{
				where: {
					id: flight_id,
				},
			}
		)

		return updatedFlight
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
	putFlightService,
	deleteFlightService,
	putCompletePhaseService,
	putConfirmQuoteService,
}
