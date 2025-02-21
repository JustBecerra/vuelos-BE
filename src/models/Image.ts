import { DataTypes, Model, Sequelize } from "sequelize"

export interface ImageAttributes {
	id?: number
	image: Buffer
	typeof: string
	airship_id: number
	original_name: string
}

const image = (sequelize: Sequelize) => {
	const Images = sequelize.define<Model<ImageAttributes>>(
		"image",
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			image: {
				type: DataTypes.BLOB,
				allowNull: false,
			},
			typeof: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			airship_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			original_name: {
				type: DataTypes.TEXT,
			},
		},
		{
			tableName: "image",
			timestamps: false,
		}
	)
	return Images
}

export default image
