import cors from "cors"

const corsConfig = cors({
	origin: ["https://tango-jets-fe.vercel.app", "http://localhost:4321"],
	methods: ["GET", "POST", "PUT", "DELETE"],
	allowedHeaders: ["Content-Type", "Authorization"],
	credentials: true,
})

export { corsConfig }
