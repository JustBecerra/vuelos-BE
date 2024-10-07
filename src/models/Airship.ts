import { DataTypes, Model, Sequelize } from "sequelize"

export interface AirshipAttributes {
	id: number
	title: string
	status: string
	pricepermiles: number
	seats: number
}

const Airship = (sequelize: Sequelize) => {
	const Airships = sequelize.define<Model<AirshipAttributes>>(
		"airship",
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			title: {
				type: DataTypes.STRING(50),
			},
			status: {
				type: DataTypes.STRING(50),
			},
			pricepermiles: {
				type: DataTypes.DOUBLE,
			},
			seats: {
				type: DataTypes.INTEGER,
			},
		},
		{
			tableName: "airship",
			timestamps: false,
		}
	)
	return Airships
}

export default Airship
