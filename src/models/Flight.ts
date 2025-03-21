import { DataTypes, Model, Optional, Sequelize } from "sequelize"

export interface FlightAttributes {
	id: number
	launchtime: Date
	arrivaltime: Date
	to: string
	from: string
	price_cost: number
	price_revenue: number
	airship_id: number
	createdby: number
	master_passenger: number
	companion_passengers: string[]
	phase: number
	type_of: string
	associated_to: string
	pilot_id: number
	first_longitude: string
	first_latitude: string
	second_longitude: string
	second_latitude: string
	flight_time: string
}

export interface FlightCreationAttributes
	extends Optional<FlightAttributes, "id"> {}

export interface FlightInstance
	extends Model<FlightAttributes, FlightCreationAttributes> {
	id: number
	launchtime: Date
	arrivaltime: Date
	to: string
	from: string
	price_cost: number
	price_revenue: number
	airship_id: number
	createdby: number
	master_passenger: number
	companion_passengers: string[]
	phase: number
	type_of: string
	associated_to: string
	pilot_id: number
	first_longitude: string
	first_latitude: string
	second_longitude: string
	second_latitude: string
	flight_time: string
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
			arrivaltime: {
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
			},
			price_revenue: {
				type: DataTypes.INTEGER,
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
				allowNull: false,
			},
			master_passenger: {
				type: DataTypes.INTEGER,
			},
			companion_passengers: {
				type: DataTypes.ARRAY(DataTypes.STRING(50)),
			},
			phase: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			type_of: {
				type: DataTypes.STRING,
			},
			associated_to: {
				type: DataTypes.STRING,
			},
			pilot_id: {
				type: DataTypes.INTEGER,
				references: {
					model: "pilot",
					key: "id",
				},
			},
			first_longitude: {
				type: DataTypes.STRING,
			},
			first_latitude: {
				type: DataTypes.STRING,
			},
			second_longitude: {
				type: DataTypes.STRING,
			},
			second_latitude: {
				type: DataTypes.STRING,
			},
			flight_time: {
				type: DataTypes.STRING,
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
