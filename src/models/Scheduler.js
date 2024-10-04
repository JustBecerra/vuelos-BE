const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
	const Scheduler = sequelize.define(
		"scheduler",
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
			},
			username: {
				type: DataTypes.STRING(255),
			},
			password: {
				type: DataTypes.STRING(255),
			},
			role: {
				type: DataTypes.STRING(50),
			},
		},
		{
			tableName: "scheduler",
			timestamps: false,
		}
	)
	return Scheduler
}
