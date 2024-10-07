import express, { Router } from "express"
import { postFlight } from "../controllers/flightController"

const router: Router = express.Router()

router.post("/flights", postFlight)

export default router
