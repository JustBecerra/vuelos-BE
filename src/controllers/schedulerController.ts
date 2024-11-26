import { Request, Response } from "express"
import {
	RegisterSchedulerService,
	LoginSchedulerService,
	storeAccessToken,
	refreshAccessToken,
} from "../services/schedulerService"
import { AuthenticatedRequest } from "../middleware/authMiddleware"

const getRefreshToken = async (req: Request, res: Response) => {
	try {
		const refreshToken = await refreshAccessToken(Number(req.params.id))

		if (!refreshToken) {
			res.status(400).json({ message: "access token wasnt refreshed" })
			return
		}
		res.status(200).json({ message: "access token was refreshed" })
	} catch (error) {
		console.log(error)
	}
}

const getScheduler = async (req: AuthenticatedRequest, res: Response) => {
	try {
		if (!req.scheduler) {
			res.status(404).json({ message: "scheduler not received" })
		}

		res.status(200).json(req.scheduler)
	} catch (err) {
		res.status(500).json({ message: "Server error", err })
	}
}

const getAccessToken = async (req: Request, res: Response) => {
	try {
		const { accessToken, id } = req.body
		const Token = await storeAccessToken({ accessToken, id })
		console.log(accessToken)
		if (!Token) {
			res.status(400).json({ message: "access token wasnt stored" })
			return
		}
		res.status(200).json({ message: "access token stored" })
	} catch (err) {
		console.error("Error storing access token:", err)
	}
}

const registerScheduler = async (req: Request, res: Response) => {
	try {
		const newUser = await RegisterSchedulerService(req.body)

		if (!newUser)
			res.status(400).json({
				message: "something went wrong inside the service",
			})
		res.status(200).json(newUser)
	} catch (err) {
		console.error("error creating new scheduler", err)
	}
}

const loginScheduler = async (req: Request, res: Response) => {
	try {
		const LogUser = await LoginSchedulerService(req.body)

		if (LogUser?.startsWith("invalid")) {
			res.status(401).json({ message: LogUser })
			return
		}

		res.status(200).json({
			success: true,
			token: LogUser,
			message: "Logged in successfully!",
		})
	} catch (err) {
		console.error("Error logging scheduler", err)
	}
}
export {
	getScheduler,
	registerScheduler,
	loginScheduler,
	getAccessToken,
	getRefreshToken,
}
