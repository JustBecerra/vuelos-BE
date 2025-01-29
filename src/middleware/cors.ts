import cors from "cors"

const corsConfig = cors({
	origin: "*",
	methods: ["GET", "POST", "PUT", "DELETE"],
	allowedHeaders: ["Content-Type", "Authorization"],
	credentials: true,
})

export { corsConfig }
