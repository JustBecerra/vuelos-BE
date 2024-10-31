import db from "../config/dbConfig"
import bcrypt from "bcryptjs"
import { generateToken } from "../middleware/generateToken"
import { SchedulerAttributes } from "../models/Scheduler"
const { Schedulers } = db

const RegisterSchedulerService = async (scheduler: SchedulerAttributes) => {
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
			flights_created: 0,
			hours_logged: 0,
		})

		return newScheduler
	} catch (err) {
		console.error(err)
	}
}

const LoginSchedulerService = async (scheduler: SchedulerAttributes) => {
	const { username, password } = scheduler
	try {
		const scheduler = await Schedulers.findOne({
			where: {
				username,
			},
		})

		if (!scheduler) {
			return "invalid email"
		}
		const dehashedPassword = scheduler?.dataValues.password

		const validPassword = await bcrypt.compare(password, dehashedPassword)

		if (!validPassword) {
			return "invalid password"
		}

		const token = generateToken({
			id: scheduler.get("id") as number,
			username: scheduler.get("username") as string,
		})

		return token
	} catch (err) {
		console.error(err)
	}
}

export { RegisterSchedulerService, LoginSchedulerService }