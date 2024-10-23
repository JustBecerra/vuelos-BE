import { DataTypes, Model, Optional, Sequelize } from "sequelize"

export interface AirshipAttributes {
	id: number
	title: string
	status: string
	pricepermiles: number
	seats: number
	size: string
}

export interface AirshipCreationAttributes
	extends Optional<AirshipAttributes, "id"> {}

export interface AirshipInstance
	extends Model<AirshipAttributes, AirshipCreationAttributes> {
	id: number
	title: string
	status: string
	pricepermiles: number
	seats: number
	size: string
}

const Airship = (sequelize: Sequelize) => {
	const Airships = sequelize.define<AirshipInstance>(
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
			size: {
				type: DataTypes.STRING(50),
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
