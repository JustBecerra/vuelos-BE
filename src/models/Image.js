const DataTypes = require("sequelize")

module.exports = (sequelize) => {
	const Images = sequelize.define(
		"image",
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
			},
			image_url: {
				type: DataTypes.TEXT,
			},
			airship_id: {
				type: DataTypes.INTEGER,
			},
		},
		{
			tableName: "image",
			timestamps: false,
		}
	)
	return Images
}
