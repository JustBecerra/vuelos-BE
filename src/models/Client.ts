import { DataTypes, Model, Optional, Sequelize } from "sequelize"
import { FlightAttributes } from "./Flight"

export interface ClientAttributes {
	id: number
	firstname: string
	lastname: string
	email: string
	phonenumber: string
	identification: string
}

export interface ClientCreationAttributes
	extends Optional<ClientAttributes, "id"> {}

export interface ClientInstance
	extends Model<ClientAttributes, ClientCreationAttributes> {
	id: number
	firstname: string
	lastname: string
	email: string
	phonenumber: string
	identification: string

	// metodos para asociación de tablas conjuntas
	addFlight: (flight: FlightAttributes) => Promise<void>
	getFlights: () => Promise<FlightAttributes[]>
	setFlights: (flights: FlightAttributes[]) => Promise<void>
}

const Client = (sequelize: Sequelize) => {
	const Clients = sequelize.define<ClientInstance>(
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
