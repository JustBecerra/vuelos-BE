const { Sequelize } = require("sequelize")

const sequelize = new Sequelize(
	"postgres://postgres:54321@localhost:5432/vuelosDB"
)

const { Airships, Connections, Clients, Flights, Users, Images } =
	sequelize.models

module.exports = {
	conn: sequelize,
}
