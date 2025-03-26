import helmet from "helmet"
import rateLimit from "express-rate-limit"

const helmetMiddleware = helmet()

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 10000,
	message: "Too many requests from this IP, please try again later.",
})

export { helmetMiddleware, limiter }
