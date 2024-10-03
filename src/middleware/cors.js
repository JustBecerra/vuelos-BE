const cors = require("cors")

const corsConfig = cors({
	origin: "http://tangojet.com", // hay que cambiarlo a la url posta
	methods: ["GET", "POST", "PUT", "DELETE"],
	credentials: true,
})

module.exports = {
	corsConfig,
}
