import { DataTypes, Model, Optional, Sequelize } from "sequelize"

export interface FlightAttributes {
	id: number
	launchtime: Date
	to: string
	from: string
	price_cost: number
	price_revenue: number
	airship_id: number
	createdby: number
	master_passenger: number
	companion_passengers: string[]
	phase: number
	pslc: number
}

export interface FlightCreationAttributes
	extends Optional<FlightAttributes, "id"> {}

export interface FlightInstance
	extends Model<FlightAttributes, FlightCreationAttributes> {
	id: number
	launchtime: Date
	to: string
	from: string
	price_cost: number
	price_revenue: number
	airship_id: number
	createdby: number
	master_passenger: number
	companion_passengers: string[]
	phase: number
	pslc: number
}

const Flights = (sequelize: Sequelize) => {
	const Flights = sequelize.define<FlightInstance>(
		"flight",
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			launchtime: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			to: {
				type: DataTypes.STRING(50),
				allowNull: false,
			},
			from: {
				type: DataTypes.STRING(50),
				allowNull: false,
			},
			price_cost: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			price_revenue: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			airship_id: {
				type: DataTypes.INTEGER,
				references: {
					model: "airship",
					key: "id",
				},
				allowNull: false,
			},
			createdby: {
				type: DataTypes.INTEGER,
				references: {
					model: "scheduler",
					key: "id",
				},
				allowNull: false,
			},
			master_passenger: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			companion_passengers: {
				type: DataTypes.ARRAY(DataTypes.STRING(50)),
			},
			phase: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			pslc: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			tableName: "flight",
			timestamps: true,
		}
	)

	return Flights
}

export default Flights
