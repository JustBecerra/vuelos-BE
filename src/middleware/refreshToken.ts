require("dotenv").config()
import db from "../config/dbConfig"
const { Schedulers } = db

const storeRefreshToken = async (
	userId: number,
	refreshToken: string,
	accessToken: string
) => {
	try {
		const refreshedScheduler = await Schedulers.update(
			{ refresh_token: refreshToken, access_token: accessToken },
			{ where: { id: userId } }
		)
	} catch (error) {
		console.error("Error storing refresh token:", error)
		throw new Error("Failed to store refresh token")
	}
}

const refreshAccessToken = async (userId: number) => {
	const { DROPBOX_APP_KEY, DROPBOX_APP_SECRET } = process.env

	const auth = Buffer.from(
		`${DROPBOX_APP_KEY}:${DROPBOX_APP_SECRET}`
	).toString("base64")

	try {
		// Retrieve the refresh token from the database
		const result = await Schedulers.findOne({
			where: {
				id: userId,
			},
		}).then((response) => response?.dataValues.refresh_token)

		if (!result) {
			throw new Error("Refresh token not found for this user")
		}

		const response = await fetch("https://api.dropbox.com/oauth2/token", {
			method: "POST",
			headers: {
				Authorization: `Basic ${auth}`,
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: new URLSearchParams({
				grant_type: "refresh_token",
				refresh_token: result, // Use the stored refresh token
			}).toString(),
		})

		const data = await response.json()

		if (data.error) {
			throw new Error(data.error_description || "Error refreshing token")
		}

		const { access_token, expires_in } = data

		// Optionally, update the access token in the database
		await Schedulers.update({ access_token }, { where: { id: userId } })

		return access_token
	} catch (error) {
		console.error("Error refreshing token:", error)
		throw new Error("Failed to refresh access token")
	}
}

module.exports = { refreshAccessToken, storeRefreshToken }
