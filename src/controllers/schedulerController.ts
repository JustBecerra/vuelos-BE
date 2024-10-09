import { Request, Response } from "express"
import { RegisterSchedulerService } from "../services/schedulerService"

const getScheduler = async (req: Request, res: Response) => {}

const registerScheduler = async (req: Request, res: Response) => {
	try {
		const newUser = await RegisterSchedulerService(req.body)
		res.status(200).json(newUser)
	} catch (err) {
		console.error("error creating new scheduler", err)
	}
}
export { getScheduler, registerScheduler }
