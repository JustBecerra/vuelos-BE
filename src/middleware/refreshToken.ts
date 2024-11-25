require("dotenv").config()
import db from "../config/dbConfig"
const { Schedulers } = db

export const getRefreshToken = async (userId: number) => {
	try {
		const refreshToken = await refreshAccessToken(userId)

		return refreshToken
	} catch (error) {
		console.log(error)
	}
}

const refreshAccessToken = async (userId: number) => {
	const { DROPBOX_APP_KEY, DROPBOX_APP_SECRET } = process.env

	const auth = Buffer.from(
		`${DROPBOX_APP_KEY}:${DROPBOX_APP_SECRET}`
	).toString("base64")

	try {
		const refresh_token = await Schedulers.findOne({
			where: {
				id: userId,
			},
		}).then((response) => response?.dataValues.refresh_token)

		if (refresh_token) {
			const response = await fetch(
				"https://api.dropbox.com/oauth2/token",
				{
					method: "POST",
					headers: {
						Authorization: `Basic ${auth}`,
						"Content-Type": "application/x-www-form-urlencoded",
					},
					body: new URLSearchParams({
						grant_type: "refresh_token",
						refresh_token: refresh_token, // Use the stored refresh token
					}).toString(),
				}
			)

			const data = await response.json()

			if (data.error) {
				throw new Error(
					data.error_description || "Error refreshing token"
				)
			}

			const { access_token, expires_in } = data

			const refreshedScheduler = await Schedulers.update(
				{ refresh_token, access_token },
				{ where: { id: userId } }
			)

			return refreshedScheduler
		}
	} catch (error) {
		console.error("Error refreshing token:", error)
		throw new Error("Failed to refresh access token")
	}
}

module.exports = {
	refreshAccessToken,
	getRefreshToken,
}
