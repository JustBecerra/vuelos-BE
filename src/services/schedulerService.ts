import db from "../config/dbConfig"
import bcrypt from "bcryptjs"
import { generateToken } from "../middleware/generateToken"
import { SchedulerAttributes } from "../models/Scheduler"
const { Schedulers } = db

interface AccessTokenType {
	accessToken: string
	id: number
}

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
			refresh_token: "",
			access_token: "",
		})

		return newScheduler
	} catch (err) {
		console.error(err)
	}
}

const storeAccessToken = async (Access: AccessTokenType) => {
	const { accessToken, id } = Access
	try {
		const storeToken = await Schedulers.update(
			{ access_token: accessToken },
			{ where: { id } }
		)

		return storeToken
	} catch (error) {
		console.log(error)
	}
}

const refreshAccessToken = async (userId: number) => {
	const { DROPBOX_APP_KEY, DROPBOX_APP_SECRET } = process.env

	const auth = Buffer.from(
		`${DROPBOX_APP_KEY}:${DROPBOX_APP_SECRET}`
	).toString("base64")

	try {
		const refresh_token = await Schedulers.findOne({
			where: {
				id: userId,
			},
		}).then((response) => response?.dataValues.refresh_token)

		if (refresh_token) {
			const response = await fetch(
				"https://api.dropbox.com/oauth2/token",
				{
					method: "POST",
					headers: {
						Authorization: `Basic ${auth}`,
						"Content-Type": "application/x-www-form-urlencoded",
					},
					body: new URLSearchParams({
						grant_type: "refresh_token",
						refresh_token: refresh_token, // Use the stored refresh token
					}).toString(),
				}
			)

			const data = await response.json()

			if (data.error) {
				throw new Error(
					data.error_description || "Error refreshing token"
				)
			}

			const { access_token, expires_in } = data

			const refreshedScheduler = await Schedulers.update(
				{ refresh_token, access_token },
				{ where: { id: userId } }
			)

			return refreshedScheduler
		}
	} catch (error) {
		console.error("Error refreshing token:", error)
		throw new Error("Failed to refresh access token")
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

export {
	RegisterSchedulerService,
	LoginSchedulerService,
	storeAccessToken,
	refreshAccessToken,
}