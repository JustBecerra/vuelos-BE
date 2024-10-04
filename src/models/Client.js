const DataTypes = require("sequelize")

module.exports = (sequelize) => {
	const Clients = sequelize.define(
		"client",
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			firstname: {
				type: DataTypes.STRING(50),
			},
			lastname: {
				type: DataTypes.STRING(50),
			},
			email: {
				type: DataTypes.STRING(50),
			},
			phonenumber: {
				type: DataTypes.STRING(50),
			},
			identification: {
				type: DataTypes.STRING(50),
			},
		},
		{
			tableName: "client",
			timestamps: false,
		}
	)
	return Clients
}
