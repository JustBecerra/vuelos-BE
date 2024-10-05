import { DataTypes, Model, Sequelize } from "sequelize"

export interface ConnectionAttributes {
	id: number
	firstname: string
	lastname: string
	email: string
	phonenumber: string
	identification: string
}

const Client = (sequelize: Sequelize) => {
	const Clients = sequelize.define<Model<ConnectionAttributes>>(
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

export default Client
