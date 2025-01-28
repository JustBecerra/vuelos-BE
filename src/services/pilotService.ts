import db from "../config/dbConfig"

const { Pilots } = db

interface PilotInterface {
	fullname: string
	phonenumber: number
	weight: string
	email: string
	type: string
	passport: string
	date_of_birth: Date
	expiration_date: Date
}

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

const postPilotService = async (Pilot: PilotInterface) => {
	try {
		const {
			fullname,
			phonenumber,
			weight,
			email,
			type,
			passport,
			date_of_birth,
			expiration_date,
		} = Pilot

		const ExistingPilot = await Pilots.findOne({
			where: {
				fullname,
			},
		})

		if (ExistingPilot) return "Pilot already exists"

		const pilot = await Pilots.create({
			fullname,
			phonenumber,
			weight,
			email,
			type,
			passport,
			date_of_birth,
			expiration_date,
		})

		if (!pilot) throw new Error("Could not create pilot")

		return pilot
	} catch (err) {
		console.error(err)
		return null
	}
}

export { getPilotsService, postPilotService }
