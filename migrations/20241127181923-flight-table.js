"use strict"

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("flight", {
			id: {
				type: Sequelize.DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			launchtime: {
				type: Sequelize.DataTypes.DATE,
				allowNull: false,
			},
			arrivaltime: {
				type: Sequelize.DataTypes.DATE,
				allowNull: false,
			},
			to: {
				type: Sequelize.DataTypes.STRING(50),
				allowNull: false,
			},
			from: {
				type: Sequelize.DataTypes.STRING(50),
				allowNull: false,
			},
			airship_id: {
				type: Sequelize.DataTypes.INTEGER,
				references: {
					model: "airship",
					key: "id",
				},
				allowNull: false,
			},
			createdby: {
				type: Sequelize.DataTypes.INTEGER,
				references: {
					model: "scheduler",
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
