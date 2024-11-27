"use strict"

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("client", {
			id: {
				type: Sequelize.DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			firstname: {
				type: Sequelize.DataTypes.STRING(50),
			},
			lastname: {
				type: Sequelize.DataTypes.STRING(50),
			},
			email: {
				type: Sequelize.DataTypes.STRING(50),
			},
			phonenumber: {
				type: Sequelize.DataTypes.STRING(50),
			},
			identification: {
				type: Sequelize.DataTypes.STRING(50),
			},
			typeid: {
				type: Sequelize.DataTypes.STRING(50),
			},
			title: {
				type: Sequelize.DataTypes.STRING(50),
			},
			address: {
				type: Sequelize.DataTypes.STRING(50),
			},
			company: {
				type: Sequelize.DataTypes.STRING(50),
			},
		})
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("airship")
	},
}
