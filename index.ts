import dbConfig from "./src/config/dbConfig"
import server from "./src/config/serverConfig"
import dotenv from "dotenv"

const { conn } = dbConfig
dotenv.config()

const { PORT } = process.env

if (!PORT) {
	console.error("PORT is not defined in the environment variables.")
	process.exit(1)
}

conn
	.authenticate()
	.then(() => console.log("Connection has been established successfully."))
	.catch((err) => console.error("Unable to connect to the database:", err))

conn.sync({ force: false }).then(() => {
	server.listen(PORT, () => {
		console.log("Listening on port", PORT)
	})
})
