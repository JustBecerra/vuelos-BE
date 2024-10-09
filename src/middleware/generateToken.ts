import jwt from "jsonwebtoken"

interface JwtPayload {
	id: number
	username: string
}

export const generateToken = (scheduler: JwtPayload): string => {
	return jwt.sign(
		{ id: scheduler.id, username: scheduler.username },
		process.env.JWT_SECRET as string,
		{ expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
	)
}
