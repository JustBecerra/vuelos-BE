import { Sequelize } from "sequelize"
import SchedulersModel from "../models/Scheduler"
import FlightsModel from "../models/Flight"
import AirshipsModel from "../models/Airship"
import ConnectionsModel from "../models/Connection"
import ClientsModel from "../models/Client"
import ImagesModel from "../models/Image"
import ClientFlightsModel from "../models/ClientFlights"
require("dotenv").config()

const sequelize = new Sequelize(`${process.env.DATABASE_URL}`, {
	logging: false,
	dialect: "postgres",
	dialectOptions: {
		ssl: {
			require: true,
			rejectUnauthorized: false,
		},
	},
})
  
const Schedulers = SchedulersModel(sequelize)
const Flights = FlightsModel(sequelize)
const Airships = AirshipsModel(sequelize)
const Connections = ConnectionsModel(sequelize)
const Clients = ClientsModel(sequelize)
const Images = ImagesModel(sequelize)
const ClientFlights = ClientFlightsModel(sequelize)

Schedulers.hasMany(Flights, { foreignKey: "createdby", as: "flights" })
Flights.hasMany(Connections, { foreignKey: "flight_id", as: "connections" })
Airships.hasMany(Flights, { foreignKey: "airship_id", as: "flights" })
Airships.hasMany(Images, { foreignKey: "airship_id", as: "images" })
Clients.belongsToMany(Flights, {
	through: ClientFlights,
	foreignKey: "clientId",
	as: "flights",
})

Flights.belongsToMany(Clients, {
	through: ClientFlights,
	foreignKey: "flightId",
	as: "clients",
})

sequelize.sync({ force: true }).then(() => {
	console.log("Database synchronized.")
})

export default {
	Schedulers,
	Flights,
	Airships,
	Connections,
	Clients,
	ClientFlights,
	Images,
	conn: sequelize,
}
