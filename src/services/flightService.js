const { Flights } = require("../config/dbConfig")

const postFlight = async (flight) => {
	try {
		const { id, launchTime, arrivalTime, to, from, airship_id, createdBy } =
			flight

		const newFlight = await Flights.create({
			id,
			launchTime,
			arrivalTime,
			to,
			from,
			airship_id,
			createdBy,
		})

		if (!newFlight) throw new Error("flight creation went wrong")

		return newFlight
	} catch (err) {
		console.error(err)
	}
}

module.exports = {
	postFlight,
}
