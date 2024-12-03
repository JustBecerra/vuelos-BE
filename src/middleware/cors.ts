import cors from "cors"

const corsConfig = cors({
	origin: "https://tango-jets-fe.vercel.app",
	methods: ["GET", "POST", "PUT", "DELETE"],
	allowedHeaders: ["Content-Type", "Authorization"],
	credentials: true,
})

export { corsConfig }
