import db from "../config/dbConfig"

const { Pilots } = db

interface PilotInterface {
	id?: number
	fullname: string
	phonenumber: string
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

const deletePilotService = async (id: string) => {
	try {
		const pilot = await Pilots.destroy({ where: { id } })
		if (pilot === 0) return "Pilot does not exist"
		return pilot
	} catch (err) {
		console.error(err)
		return null
	}
}

const putPilotService = async (Pilot: PilotInterface) => {
	try {
		const {
			id,
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
				id,
			},
		})

		if (!ExistingPilot) return "Pilot doesnt exist"

		const modifiedPilot = await Pilots.update(
			{
				fullname: fullname || ExistingPilot.dataValues.fullname,
				phonenumber:
					phonenumber || ExistingPilot.dataValues.phonenumber,
				weight: weight || ExistingPilot.dataValues.weight,
				email: email || ExistingPilot.dataValues.email,
				type: type || ExistingPilot.dataValues.type,
				passport: passport || ExistingPilot.dataValues.passport,
				date_of_birth:
					date_of_birth || ExistingPilot.dataValues.date_of_birth,
				expiration_date:
					expiration_date || ExistingPilot.dataValues.expiration_date,
			},
			{ where: { id } }
		)

		if (modifiedPilot[0] < 1) return 0
		return modifiedPilot
	} catch (err) {
		console.error(err)
		return null
	}
}

export {
	getPilotsService,
	postPilotService,
	deletePilotService,
	putPilotService,
}
