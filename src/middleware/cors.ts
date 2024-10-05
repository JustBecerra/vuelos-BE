import cors from "cors"

const corsConfig = cors({
	origin: "http://tangojet.com",
	methods: ["GET", "POST", "PUT", "DELETE"],
	credentials: true,
})

export { corsConfig }
