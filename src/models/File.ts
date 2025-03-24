import { DataTypes, Model, Optional, Sequelize } from "sequelize"

export interface FileCreationAttributes
	extends Optional<FileAttributes, "id"> {}
export interface FileAttributes {
	id: number
	original_name: string
	source: Buffer
	flight_id: number
}

const file = (sequelize: Sequelize) => {
	const Files = sequelize.define<Model<FileCreationAttributes>>(
		"file",
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			original_name: {
				type: DataTypes.TEXT,
			},
			source: {
				type: DataTypes.BLOB("long"),
				allowNull: false,
			},
			flight_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			tableName: "file",
			timestamps: false,
		}
	)
	return Files
}

export default file
