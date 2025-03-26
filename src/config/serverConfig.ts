import express, { Request, Response, NextFunction } from "express"
import { helmetMiddleware, limiter } from "../middleware/security"
import { corsConfig } from "../middleware/cors"
import routes from "../routes/index"
import cookieParser from "cookie-parser"
const server = express()
server.set("trust proxy", 1)
server.use(corsConfig)
server.use(helmetMiddleware)
server.use(cookieParser())
server.use(limiter)
server.use(express.json())
server.use("/", routes)

server.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	console.error(err.stack)
	res.status(500).send("Something broke!")
})

export default server
