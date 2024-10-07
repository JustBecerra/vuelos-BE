import helmet from "helmet"
import rateLimit from "express-rate-limit"

// Helmet middleware configuration
const helmetMiddleware = helmet()

// Rate limiter configuration
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per windowMs
	message: "Too many requests from this IP, please try again later.",
})

// Exporting the middlewares
export { helmetMiddleware, limiter }
