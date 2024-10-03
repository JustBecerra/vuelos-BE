const { Sequelize } = require("sequelize")

const sequelize = new Sequelize(
	"postgres://postgres:54321@localhost:5432/vuelosDB"
)

module.exports = {
	conn: sequelize,
}
