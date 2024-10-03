const { Sequelize } = require("sequelize")

const sequelize = new Sequelize(
	"postgres://postgres:54321@localhost:5432/vuelosDB"
)

const { Airships, Connections, Clients, Flights, Users, Images } =
	sequelize.models

Users.belongsTo(Flights, {
	foreignKey: "createdBy",
	as: "flight",
})

Clients.belongsToMany(Flights, { through: "flight_client" })
Flights.belongsToMany(Clients, { through: "flight_client" })

module.exports = {
	conn: sequelize,
}
