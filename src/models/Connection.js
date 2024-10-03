const DataTypes = require("sequelize")

module.exports = (sequelize) => {
	const Connections = sequelize.define(
		"connection",
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
			},
			launchtime: {
				type: DataTypes.DATE,
			},
			arrivaltime: {
				type: DataTypes.DATE,
			},
			to: {
				type: DataTypes.STRING(50),
			},
			from: {
				type: DataTypes.STRING(50),
			},
			flight_id: {
				type: DataTypes.INTEGER,
			},
		},
		{
			tableName: "connection",
			timestamps: false,
		}
	)
	return Connections
}
