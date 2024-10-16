import db from "../config/dbConfig"
const { Airships } = db

interface airshipProps {
	id: number
	title: string
	status: string
	pricepermiles: number
	seats: number
}

const getAirshipsService = async () => {
	try {
		const airships = await Airships.findAll()

		if (!airships) throw new Error("There are no airships available")

		return airships
	} catch (err) {
		console.error(err)
		return null
	}
}

const postAirshipService = async (airship: airshipProps) => {
	const { id, title, status, pricepermiles, seats } = airship
	try {
		const airship = await Airships.create({
			id,
			title,
			status,
			pricepermiles,
			seats,
		})

		if (!airship) throw new Error("airship creation went wrong")

		return airship
	} catch (err) {
		console.error(err)
		return null
	}
}

const putAirshipService = async (airship: airshipProps) => {
	const { id, title, status, pricepermiles, seats } = airship
	try {
		const oldAirship = await Airships.findByPk(id)

		if (oldAirship) {
			const airshipToModify = await Airships.update(
				{
					title: title || oldAirship.dataValues.title,
					status: status || oldAirship.dataValues.status,
					pricepermiles:
						pricepermiles || oldAirship.dataValues.pricepermiles,
					seats: seats || oldAirship.dataValues.seats,
				},
				{
					where: {
						id,
					},
				}
			)
			if (airshipToModify[0] < 1) return 0
			return airshipToModify
		} else {
			return 0
		}
	} catch (err) {
		console.error(err)
		throw new Error("airship modification wasnt possible")
	}
}

export { getAirshipsService, postAirshipService, putAirshipService }
