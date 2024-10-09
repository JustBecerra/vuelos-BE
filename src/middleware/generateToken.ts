import jwt from "jsonwebtoken"

interface JwtPayload {
	id: number
	email: string
}

export const generateToken = (user: JwtPayload): string => {
	return jwt.sign(
		{ id: user.id, email: user.email },
		process.env.JWT_SECRET as string,
		{ expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
	)
}
