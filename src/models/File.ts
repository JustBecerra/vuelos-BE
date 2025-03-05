import { DataTypes, Model, Sequelize } from "sequelize"

export interface FileAttributes {
	id: number
	original_name: string
	source: Buffer
}

const file = (sequelize: Sequelize) => {
    const Files = sequelize.define<Model<FileAttributes>>(
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
				type: DataTypes.BLOB,
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