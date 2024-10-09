import db from "../config/dbConfig"
import bcrypt from "bcryptjs"
const { Schedulers } = db

interface SchedulerInput {
	id: number
	username: string
	password: string
	role: string
}

const RegisterSchedulerService = async (scheduler: SchedulerInput) => {
	const { id, username, password, role } = scheduler
	try {
		const existingScheduler = await Schedulers.findOne({
			where: {
				username,
			},
		})
		if (existingScheduler) throw new Error("scheduler already exists")

		const salt = await bcrypt.genSalt(10)
		const hashedPassword = await bcrypt.hash(password, salt)

		const newScheduler = await Schedulers.create({
			id,
			username,
			password: hashedPassword,
			role,
		})

		return newScheduler
	} catch (err) {
		console.error(err)
	}
}

export { RegisterSchedulerService }