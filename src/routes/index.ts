import express, { Router } from "express"
import {
	postFlight,
	getFlights,
	getFlightById,
} from "../controllers/flightController"

const router: Router = express.Router()

//flights
router.post("/flight", postFlight)
router.get("/flights", getFlights)
router.get("/flight/:id", getFlightById)

export default router
