import jwt from "jsonwebtoken"
import cookie from "cookie"
import { NextFunction, Request, Response } from "express"

// Middleware to protect routes and verify the JWT token hay que ver si uso esto
const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
	const cookies = cookie.parse(req.headers.cookie || "")
	const token = cookies.token

	if (!token) {
		return res
			.status(403)
			.json({ message: "Access denied, no token provided" })
	}

	jwt.verify(token, "your_jwt_secret", (err, user) => {
		if (err) {
			return res.status(403).json({ message: "Invalid token" })
		}
		// req.user = user // Attach the user to the request
		next()
	})
}

module.exports = authenticateToken
