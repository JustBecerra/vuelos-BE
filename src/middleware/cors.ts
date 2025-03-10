import cors from "cors"

const corsConfig = cors({
	origin: "*",
	methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
	allowedHeaders: ["Content-Type", "Authorization"],
	credentials: true,
})

export { corsConfig }
