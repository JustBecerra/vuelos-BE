import db from "../config/dbConfig"
const { Flights, Schedulers, Airships } = db
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

export { postFlightService }
