import express, { Router } from "express"
import {
	postFlight,
	getFlights,
	getFlightById,
	getFlightByClientId,
	putFlight,
	deleteFlight,
	putCompletePhase,
} from "../controllers/flightController"
import {
	postClientFlight,
	postClient,
	getClientById,
	getClient,
	putClient,
	deleteClient,
} from "../controllers/clientController"
import {
	getScheduler,
	registerScheduler,
	loginScheduler,
} from "../controllers/schedulerController"
import {
	getAirships,
	postAirship,
	putAirship,
	deleteAirship,
	getAirshipsById,
} from "../controllers/airshipController"
import { ProtectRoute } from "../middleware/authMiddleware"
import multer from "multer"
import { deleteImage, getImages } from "../controllers/imageController"
import { sendEmailController } from "../controllers/emailController"
const router: Router = express.Router()

//flights
router.post("/flight", postFlight)
router.get("/flights", getFlights)
router.put("/flight", putFlight)
router.get("/flight/:id", getFlightById)
router.get("/clientflight/:id", getFlightByClientId)
router.delete("/flight/:id", deleteFlight)
router.put("/flight/phase/:id/:phasenumber", putCompletePhase)

//clients
router.post("/clients/:clientId/flights/:flightId", postClientFlight)
router.post("/client", postClient)
router.get("/client/:clientId", getClientById)
router.get("/clients", getClient)
router.put("/client", putClient)
router.delete("/client/:id", deleteClient)

//users
router.get("/scheduler", ProtectRoute, getScheduler)
router.post("/scheduler/login", loginScheduler)
router.post("/scheduler/register", registerScheduler)

//airships
const upload = multer({ storage: multer.memoryStorage() })

router.get("/airships", getAirships)
router.post("/airships/invoice", getAirshipsById)
router.post(
	"/airship",
	upload.fields([
		{ name: "portrait", maxCount: 1 },
		{ name: "generic", maxCount: 10 },
	]),
	postAirship
) //crea aeronave y sus imagenes
router.put(
	"/airship",
	upload.fields([
		{ name: "portrait", maxCount: 1 },
		{ name: "generic", maxCount: 10 },
	]),
	putAirship
)
router.delete("/airship/:id", deleteAirship)

//email
router.post("/email", sendEmailController)

//images
router.get("/images/:id", getImages)
router.delete("/image/:id", deleteImage)

export default router
