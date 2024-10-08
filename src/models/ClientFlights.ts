import { DataTypes, Model, Sequelize } from "sequelize"

export interface ClientFlightsAttributes {
	clientId: number
	flightId: number
}

const ClientFlight = (sequelize: Sequelize) => {
	const ClientFlights = sequelize.define<Model<ClientFlightsAttributes>>(
		"ClientFlights",
		{
			clientId: {
				type: DataTypes.INTEGER,
				references: {
					model: "client",
					key: "id",
				},
				allowNull: false,
			},
			flightId: {
				type: DataTypes.INTEGER,
				references: {
					model: "flight",
					key: "id",
				},
				allowNull: false,
			},
		},
		{
			tableName: "ClientFlights",
			timestamps: true,
		}
	)
	return ClientFlights
}

export default ClientFlight
