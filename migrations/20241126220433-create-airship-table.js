"use strict"

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("airship", {
			id: {
				type: Sequelize.DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			title: {
				type: Sequelize.DataTypes.STRING(50),
			},
			status: {
				type: Sequelize.DataTypes.STRING(50),
			},
			pricepermile: {
				type: Sequelize.DataTypes.DOUBLE,
			},
			seats: {
				type: Sequelize.DataTypes.INTEGER,
			},
			size: {
				type: Sequelize.DataTypes.STRING(50),
			},
			createdAt: {
				type: Sequelize.DataTypes.DATE,
				defaultValue: Sequelize.DataTypes.NOW,
			},
			updatedAt: {
				type: Sequelize.DataTypes.DATE,
				defaultValue: Sequelize.DataTypes.NOW,
			},
		})
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("airship")
	},
}
