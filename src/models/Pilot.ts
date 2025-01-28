import { DataTypes, Model, Sequelize } from "sequelize"

export interface PilotAttributes {
	id: number
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
	const Pilots = sequelize.define<Model<PilotAttributes>>(
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
			tableName: "scheduler",
			timestamps: false,
		}
	)
	return Pilots
}

export default Pilot
