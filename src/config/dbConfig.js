const { Sequelize } = require("sequelize")
const sequelize = new Sequelize(
	"postgres://postgres:54321@localhost:5432/vuelosDB",
	{
		logging: false,
	}
)

const Schedulers = require("../models/Scheduler")(sequelize)
const Flights = require("../models/Flight")(sequelize)
const Airships = require("../models/Airship")(sequelize)
const Connections = require("../models/Connection")(sequelize)
const Clients = require("../models/Client")(sequelize)
const Images = require("../models/Image")(sequelize)

sequelize.models = {
	Schedulers,
	Flights,
	Airships,
	Connections,
	Clients,
	Images,
}

Schedulers.hasMany(Flights, { foreignKey: "createdby", as: "flights" })
Flights.hasMany(Connections, { foreignKey: "flight_id", as: "connections" })
Airships.hasMany(Flights, { foreignKey: "airship_id", as: "flights" })
Airships.hasMany(Images, { foreignKey: "airship_id", as: "images" })
Clients.belongsToMany(Flights, { through: "flight_client" })
Flights.belongsToMany(Clients, { through: "flight_client" })

sequelize.sync()
module.exports = {
	...sequelize.models,
	conn: sequelize,
}
