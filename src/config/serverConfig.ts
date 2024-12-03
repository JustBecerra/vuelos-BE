import express, { Request, Response, NextFunction } from "express"
import { helmetMiddleware, limiter } from "../middleware/security"
import { corsConfig } from "../middleware/cors"
import routes from "../routes/index"

const server = express()
// server.use(corsConfig)
server.options('*', corsConfig);
server.use(helmetMiddleware)
server.use(limiter)
server.use(express.json())
server.use("/", routes)

server.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	console.error(err.stack)
	res.status(500).send("Something broke!")
})

export default server
