const DataTypes = require("sequelize")

module.exports = (sequelize) => {
	const Flights = sequelize.define(
		"flight",
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
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
			airship_id: {
				type: DataTypes.INTEGER,
				references: {
					model: "airship",
					key: "id",
				},
			},
			createdby: {
				type: DataTypes.INTEGER,
				references: {
					model: "scheduler",
					key: "id",
				},
			},
		},
		{
			tableName: "flight",
			timestamps: true,
		}
	)

	return Flights
}
