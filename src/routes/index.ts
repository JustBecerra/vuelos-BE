import express, { Router } from "express"
import {
	postFlight,
	getFlights,
	getFlightById,
	getFlightByClientId,
} from "../controllers/flightController"
import { postClientFlight, postClient, getClientById, getClient } from "../controllers/clientController"
import {
	getScheduler,
	registerScheduler,
	loginScheduler,
} from "../controllers/schedulerController"
import {
	getAirships,
	postAirship,
	putAirship,
} from "../controllers/airshipController"
import { ProtectRoute } from "../middleware/authMiddleware"

const router: Router = express.Router()

//flights
router.post("/flight", postFlight)
router.get("/flights", getFlights)
router.get("/flight/:id", getFlightById)
router.get("/clientflight/:id", getFlightByClientId)

//clients
router.post("/clients/:clientId/flights/:flightId", postClientFlight)
router.post("/client", postClient)
router.get("/client/:clientId", getClientById)
router.get("/clients", getClient)

//users
router.get("/scheduler", ProtectRoute, getScheduler)
router.post("/scheduler/login", loginScheduler)
router.post("/scheduler/register", registerScheduler)

//airships
router.get("/airships", getAirships)
router.post("/airship", postAirship)
router.put("/airship", putAirship)
export default router
