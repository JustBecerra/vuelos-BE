import express, { Router } from "express"
import {
	postFlight,
	getFlights,
	getFlightById,
	getFlightByClientId,
} from "../controllers/flightController"

const router: Router = express.Router()

//flights
router.post("/flight", postFlight)
router.get("/flights", getFlights)
router.get("/flight/:id", getFlightById)
router.get("/clientflight/:id", getFlightByClientId)

export default router
