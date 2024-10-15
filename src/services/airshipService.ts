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

export { getAirshipsService, postAirshipService }
