import { DataTypes, Model, Optional, Sequelize } from "sequelize"

export interface FlightCreationAttributes
	extends Optional<PilotAttributes, "id"> {}

export interface PilotAttributes {
	id: FlightCreationAttributes
	fullname: string
	phonenumber: number
	weight: string
	email: string
	type: string
	passport: string
	date_of_birth: Date
	expiration_date: Date
}

const Pilot = (sequelize: Sequelize) => {
	const Pilots = sequelize.define<Model<FlightCreationAttributes>>(
		"pilot",
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			fullname: {
				type: DataTypes.STRING(50),
				allowNull: false,
			},
			phonenumber: {
				type: DataTypes.INTEGER,
			},
			weight: {
				type: DataTypes.INTEGER,
			},
			email: {
				type: DataTypes.STRING(100),
			},
			type: {
				type: DataTypes.STRING(50),
			},
			passport: {
				type: DataTypes.STRING(50),
			},
			date_of_birth: {
				type: DataTypes.DATE,
			},
			expiration_date: {
				type: DataTypes.DATE,
			},
		},
		{
			tableName: "pilot",
			timestamps: false,
		}
	)
	return Pilots
}

export default Pilot
