import { Request, Response } from "express"
import {
	RegisterSchedulerService,
	LoginSchedulerService,
} from "../services/schedulerService"

const getScheduler = async (req: Request, res: Response) => {}

const registerScheduler = async (req: Request, res: Response) => {
	try {
		const newUser = await RegisterSchedulerService(req.body)
		res.status(200).json(newUser)
	} catch (err) {
		console.error("error creating new scheduler", err)
	}
}

const loginScheduler = async (req: Request, res: Response) => {
	try {
		const LogUser = await LoginSchedulerService(req.body)

		if (LogUser === "invalid password or email")
			res.status(401).json({ message: LogUser })
		res.status(200).json({
			success: true,
			LogUser,
			message: "Logged in successfully!",
		})
	} catch (err) {
		console.error("Error logging scheduler", err)
	}
}
export { getScheduler, registerScheduler, loginScheduler }
