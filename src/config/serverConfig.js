const express = require("express")
const { helmetMiddleware, limiter } = require("../middleware/security")
const { corsConfig } = require("../middleware/cors")
const routes = require("../routes/index")
const server = express()

server.use(express.json())
server.use("/", routes)


server.use(helmetMiddleware)
server.use(limiter)
server.use(corsConfig)

server.use((err, req, res, next) => {
	console.error(err.stack)
	res.status(500).send("Something broke!")
})

module.exports = server
