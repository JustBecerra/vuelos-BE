import express, { Router } from "express"
import {
	postFlight,
	getFlights,
	getFlightById,
	getFlightByClientId,
} from "../controllers/flightController"
import { postClientFlight, postClient } from "../controllers/clientController"
import { getScheduler } from "../controllers/schedulerController"

const router: Router = express.Router()

//flights
router.post("/flight", postFlight)
router.get("/flights", getFlights)
router.get("/flight/:id", getFlightById)
router.get("/clientflight/:id", getFlightByClientId)

//clients
router.post("/clients/:clientId/flights/:flightId", postClientFlight)
router.post("/client", postClient)

//users
router.get("/scheduler", getScheduler)
export default router
