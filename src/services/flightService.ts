import db from "../config/dbConfig"
import { Op } from "sequelize"
const { Flights, Schedulers, Airships, ClientFlights } = db
interface FlightInput {
	id: number
	launchtime: Date
	arrivaltime: Date
	to: string
	from: string
	airship_name: string
	createdby: string
}

const postFlightService = async (flight: FlightInput) => {
	try {
		const { launchtime, arrivaltime, to, from, airship_name, createdby } =
			flight

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

		const airship = await Airships.findOne({
			where: {
				title: airship_name,
			},
		})

		if (!airship) return "Airship does not exist."

		const airship_id = airship?.dataValues.id

		const overlappingFlight = await Flights.findOne({
			where: {
				airship_id,

				[Op.or]: [
					{
						launchtime: {
							[Op.between]: [launchtime, arrivaltime],
						},
					},
					{
						arrivaltime: {
							[Op.between]: [launchtime, arrivaltime],
						},
					},
					{
						[Op.and]: [
							{
								launchtime: { [Op.lte]: launchtime },
							},
							{
								arrivaltime: { [Op.gte]: arrivaltime },
							},
						],
					},
				],
			},
		})

		if (overlappingFlight) {
			return "Airship is already scheduled for another flight during this time."
		}

		const newFlight = await Flights.create({
			launchtime,
			arrivaltime,
			to,
			from,
			airship_id,
			createdby: scheduler_id,
		})

		if (!newFlight) return "Flight creation went wrong"

		return newFlight
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
	const { id, launchtime, arrivaltime, to, from, airship_name } = flight
	try {
		const oldFlight = await Flights.findByPk(id)

		if (oldFlight) {
			const airship = await Airships.findOne({
				where: {
					title: airship_name,
				},
			})

			if (!airship) return "Airship does not exist."

			const airship_id = airship?.dataValues.id

			const flightToModify = await Flights.update(
				{
					launchtime: launchtime || oldFlight.dataValues.launchtime,
					arrivaltime:
						arrivaltime || oldFlight.dataValues.arrivaltime,
					to: to || oldFlight.dataValues.to,
					from: from || oldFlight.dataValues.from,
					airship_id: airship_id || oldFlight.dataValues.airship_id,
					createdby: oldFlight.dataValues.createdby,
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

const getFlightsService = async () => {
	try {
		const flights = await Flights.findAll()

		if (!flights) throw new Error("There are no flights scheduled")
		const filteredDataPromises = flights.map((flight: any) => {
			const {
				launchtime,
				arrivaltime,
				createdAt,
				updatedAt,
				createdby,
				airship_id,
				...rest
			} = flight.toJSON()

			return getAlteredValues(createdby, airship_id).then(
				(alteredData) => ({
					launchtime: new Date(launchtime).toISOString().slice(0, 16),
					arrivaltime: new Date(arrivaltime)
						.toISOString()
						.slice(0, 16),
					createdAt: new Date(createdAt).toISOString().slice(0, 16),
					updatedAt: new Date(updatedAt).toISOString().slice(0, 16),
					createdby: alteredData?.schedulerFound,
					airship_name: alteredData?.airshipName,
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

export {
	postFlightService,
	getFlightsService,
	getFlightByIdService,
	getFlightByClientIdService,
	putFlightService,
	deleteFlightService,
}
