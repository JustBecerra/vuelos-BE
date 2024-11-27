"use strict"

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("ClientFlights", {
			id: {
				type: Sequelize.DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			launchtime: {
				type: Sequelize.DataTypes.DATE,
			},
			arrivaltime: {
				type: Sequelize.DataTypes.DATE,
			},
			to: {
				type: Sequelize.DataTypes.STRING(50),
			},
			from: {
				type: Sequelize.DataTypes.STRING(50),
			},
			flight_id: {
				type: Sequelize.DataTypes.INTEGER,
			},
		})
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("airship")
	},
}
