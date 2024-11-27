"use strict"
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("flights", {
			id: {
				type: Sequelize.DataTypes.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
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
				type: Sequelize.DataTypes.STRING,
				allowNull: false,
			},
			from: {
				type: Sequelize.DataTypes.STRING,
				allowNull: false,
			},
			airship_id: {
				type: Sequelize.DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "airship",
					key: "id",
				},
				onDelete: "CASCADE",
			},
			createdAt: {
				type: Sequelize.DataTypes.DATE,
				allowNull: false,
			},
			updatedAt: {
				type: Sequelize.DataTypes.DATE,
				allowNull: false,
			},
		})
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("flights")
	},
}
