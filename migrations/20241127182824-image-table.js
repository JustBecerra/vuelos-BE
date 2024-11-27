"use strict"

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("image", {
			id: {
				type: Sequelize.DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			image_url: {
				type: Sequelize.DataTypes.TEXT,
				allowNull: false,
			},
			dropbox_path: {
				type: Sequelize.DataTypes.TEXT,
				allowNull: false,
			},
			airship_id: {
				type: Sequelize.DataTypes.INTEGER,
				allowNull: false,
			},
		})
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("airship")
	},
}
