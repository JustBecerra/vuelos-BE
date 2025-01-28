import db from "../config/dbConfig"

const { Pilots } = db

const getPilotsService = async () => {
	try {
		const pilots = await Pilots.findAll()

		if (!pilots) throw new Error("There are no pilots")

		return pilots
	} catch (err) {
		console.error(err)
		return null
	}
}

export { getPilotsService }
