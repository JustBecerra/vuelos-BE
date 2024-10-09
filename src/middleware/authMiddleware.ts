import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import db from "../config/dbConfig"
import { SchedulerAttributes } from "../models/Scheduler"
const { Schedulers } = db
interface JwtPayload {
	id: number
	username: string
}

export interface AuthenticatedRequest extends Request {
	scheduler?: SchedulerAttributes
}

export const ProtectRoute = async (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction
) => {
	let token

	// chequee que el header de autorizacion exista y comience con Bearer
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		try {
			// Extraigo el token del header
			token = req.headers.authorization.split(" ")[1]

			// verifico el token
			const decoded = jwt.verify(
				token,
				process.env.JWT_SECRET as string
			) as JwtPayload

			// encuentro el scheduler en la base de datos
			const userScheduler = await Schedulers.findByPk(decoded.id)

			// si lo encuentro, lo engancho al request
			req.scheduler = userScheduler?.dataValues

			// avanza al siguiente middleware o a la ruta
			next()
		} catch (error) {
			res.status(401).json({ message: "Not authorized, token failed" })
		}
	} else {
		res.status(401).json({ message: "No token, authorization denied" })
	}
}
