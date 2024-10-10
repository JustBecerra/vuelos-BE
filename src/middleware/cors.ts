import cors from "cors"

const corsConfig = cors({
	origin: "http://localhost:4321",
	methods: ["GET", "POST", "PUT", "DELETE"],
	credentials: true,
})

export { corsConfig }
