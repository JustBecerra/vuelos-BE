const { conn } = require("./src/config/dbConfig")
const server = require("./src/config/serverConfig")
require("dotenv").config()

const { PORT } = process.env

conn
	.authenticate()
	.then(() => console.log("Connection has been established successfully."))
	.catch((err) => console.error("Unable to connect to the database:", err))

conn.sync({ force: false }).then(() => {
	server.listen(PORT, () => {
		console.log("listening on port", PORT)
	})
})
