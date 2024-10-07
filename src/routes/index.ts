import express, { Router } from "express"
import { postFlight, getFlights } from "../controllers/flightController"

const router: Router = express.Router()

//flights
router.post("/flights", postFlight)
router.get("/flights", getFlights)

export default router
