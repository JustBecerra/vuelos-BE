const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
	const Airships = sequelize.define(
		"airship",
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
			},
			title: {
				type: DataTypes.STRING(50),
			},
			status: {
				type: DataTypes.STRING(50),
			},
			pricepermiles: {
				type: DataTypes.DOUBLE,
			},
			seats: {
				type: DataTypes.INTEGER,
			},
		},
		{
			tableName: "airship",
			timestamps: false,
		}
	)
	return Airships
}
