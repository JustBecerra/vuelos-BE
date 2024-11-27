"use strict"

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("ClientFlights", {
			clientId: {
				type: Sequelize.DataTypes.INTEGER,
				references: {
					model: "client",
					key: "id",
				},
				allowNull: false,
			},
			flightId: {
				type: Sequelize.DataTypes.INTEGER,
				references: {
					model: "flight",
					key: "id",
				},
				allowNull: false,
			},
		})
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("airship")
	},
}
