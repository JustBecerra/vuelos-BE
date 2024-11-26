import { DataTypes, Model, Sequelize } from "sequelize"

export interface SchedulerAttributes {
	id: number
	username: string
	password: string
	role: string
	flights_created: number
	hours_logged: number
	refresh_token: string
	access_token: string
}

const Scheduler = (sequelize: Sequelize) => {
	const Schedulers = sequelize.define<Model<SchedulerAttributes>>(
		"scheduler",
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
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
			flights_created: {
				type: DataTypes.INTEGER,
			},
			hours_logged: {
				type: DataTypes.INTEGER,
			},
			refresh_token: {
				type: DataTypes.STRING(255),
			},
			access_token: {
				type: DataTypes.STRING(255),
			},
		},
		{
			tableName: "scheduler",
			timestamps: false,
		}
	)
	return Schedulers
}

export default Scheduler
