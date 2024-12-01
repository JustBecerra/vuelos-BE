import { DataTypes, Model, Sequelize } from "sequelize"

export interface ImageAttributes {
	id?: number
	image: Buffer
	local_path: string
	airship_id: number
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
			local_path: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			airship_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
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
