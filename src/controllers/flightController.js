const { Op } = require("sequelize")

const postFlight = async (req, res) => {
	try {
		const flight = await flightService.postFlight(req.body)
		res.status(200).json(flight)
	} catch (error) {
		console.error("error adding new flight", error)
		res.status(500).json({
			message: "Error creating flight",
			error: { name: error.name, message: error.message, stack: error.stack },
		})
	}
}

module.exports = {
	postFlight,
}