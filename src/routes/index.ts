import express, { Router } from "express"
import {
	postFlight,
	getFlights,
	getFlightById,
	getFlightByClientId,
	putFlight,
	deleteFlight,
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
	getAccessToken,
	getRefreshToken,
} from "../controllers/schedulerController"
import {
	getAirships,
	postAirship,
	putAirship,
	deleteAirship,
} from "../controllers/airshipController"
import { ProtectRoute } from "../middleware/authMiddleware"
import multer from "multer"
import { deleteImage, getImages } from "../controllers/imageController"
const router: Router = express.Router()

//flights
router.post("/flight", postFlight)
router.get("/flights", getFlights)
router.put("/flight", putFlight)
router.get("/flight/:id", getFlightById)
router.get("/clientflight/:id", getFlightByClientId)
router.delete("/flight/:id", deleteFlight)

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
router.post("/airship", upload.array("images"), postAirship) //crea aeronave y sus imagenes
router.put("/airship", upload.array("images"), putAirship)
router.delete("/airship/:id", deleteAirship)

//images
router.get("/images/:id", getImages)
router.delete("/image/:id", deleteImage)

//auth
router.get("/refresh/:id", getRefreshToken)
router.post("/access", getAccessToken)
export default router
