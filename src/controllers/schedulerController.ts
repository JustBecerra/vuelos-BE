import { Request, Response } from "express"
import {
	RegisterSchedulerService,
	LoginSchedulerService,
} from "../services/schedulerService"
import { AuthenticatedRequest } from "../middleware/authMiddleware"

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

		if (LogUser?.startsWith("invalid") || !LogUser) {
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
export { registerScheduler, loginScheduler, getScheduler }
