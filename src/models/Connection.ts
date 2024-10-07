import { DataTypes, Model, Sequelize } from "sequelize"

export interface ConnectionAttributes {
	id: number
	launchtime: Date
	arrivaltime: Date
	to: string
	from: string
	flight_id: number
}

const connection = (sequelize: Sequelize) => {
	const Connections = sequelize.define<Model<ConnectionAttributes>>(
		"connection",
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

export default connection
