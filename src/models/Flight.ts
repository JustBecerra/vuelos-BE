import { DataTypes, Model, Sequelize } from "sequelize"

// Define the attributes of the Flight model
export interface FlightAttributes {
	id: number
	launchtime: Date
	arrivaltime: Date
	to: string
	from: string
	airship_id: number
	createdby: number
}

const Flights = (sequelize: Sequelize) => {
	const Flights = sequelize.define<Model<FlightAttributes>>(
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
		},
		{
			tableName: "flight",
			timestamps: true,
		}
	)

	return Flights
}

export default Flights
