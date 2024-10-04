const express = require("express")
const router = express.Router()
const flightController = require("../controllers/flightController")

router.post("/flights", flightController.postFlight)

module.exports = router
