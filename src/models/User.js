const DataTypes = require("sequelize")

module.exports = (sequelize) => {
	const Users = sequelize.define(
		"user",
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
			tableName: "user",
			timestamps: false,
		}
	)
	return Users
}
