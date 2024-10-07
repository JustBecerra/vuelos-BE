import { Sequelize } from "sequelize"
import SchedulersModel from "../models/Scheduler"
import FlightsModel from "../models/Flight"
import AirshipsModel from "../models/Airship"
import ConnectionsModel from "../models/Connection"
import ClientsModel from "../models/Client"
import ImagesModel from "../models/Image"

const sequelize = new Sequelize(
	"postgres://postgres:54321@localhost:5432/vuelosDB",
	{
		logging: false,
	}
)

const Schedulers = SchedulersModel(sequelize)
const Flights = FlightsModel(sequelize)
const Airships = AirshipsModel(sequelize)
const Connections = ConnectionsModel(sequelize)
const Clients = ClientsModel(sequelize)
const Images = ImagesModel(sequelize)

Schedulers.hasMany(Flights, { foreignKey: "createdby", as: "flights" })
Flights.hasMany(Connections, { foreignKey: "flight_id", as: "connections" })
Airships.hasMany(Flights, { foreignKey: "airship_id", as: "flights" })
Airships.hasMany(Images, { foreignKey: "airship_id", as: "images" })
Clients.belongsToMany(Flights, { through: "flight_client" })
Flights.belongsToMany(Clients, { through: "flight_client" })

sequelize.sync()

export default {
	Schedulers,
	Flights,
	Airships,
	Connections,
	Clients,
	Images,
	conn: sequelize,
}
