const { Flights } = require("../config/dbConfig")

const postFlight = async (flight) => {
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

		if (!newFlight) throw new Error("flight creation went wrong")

		return newFlight
	} catch (err) {
		console.error(err)
	}
}

module.exports = {
	postFlight,
}
