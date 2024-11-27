"use strict"

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("scheduler", {
			id: {
				type: Sequelize.DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			username: {
				type: Sequelize.DataTypes.STRING(255),
			},
			password: {
				type: Sequelize.DataTypes.STRING(255),
			},
			role: {
				type: Sequelize.DataTypes.STRING(50),
			},
			flights_created: {
				type: Sequelize.DataTypes.INTEGER,
			},
			hours_logged: {
				type: Sequelize.DataTypes.INTEGER,
			},
			refresh_token: {
				type: Sequelize.DataTypes.STRING(255),
			},
			access_token: {
				type: Sequelize.DataTypes.STRING(255),
			},
		})
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("airship")
	},
}
