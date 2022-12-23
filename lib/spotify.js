const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const TOP_ITEMS_ENDPOINT = `https://api.spotify.com/v1/me/top/`; // type can be artists or tracks

export const determineTextSize = (popularity) => {
	if (popularity <= 60) return "small";
	if (popularity > 60 && popularity < 70) return "medium";
	if (popularity >= 70 && popularity < 85) return "large";
	if (popularity >= 85) return "xlarge";
};

const getAccessToken = async (refresh_token) => {
	const response = await fetch(TOKEN_ENDPOINT, {
		method: "POST",
		headers: {
			Authorization: `Basic ${basic}`,
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: new URLSearchParams({
			grant_type: "refresh_token",
			refresh_token,
		}),
	});

	return response.json();
};

export const getUsersTopItems = async (
	refresh_token,
	type,
	limit = 50,
	time_range = "long_term"
) => {
	const { access_token } = await getAccessToken(refresh_token);
	return fetch(
		`${TOP_ITEMS_ENDPOINT}${type}?limit=${limit}&time_range=${time_range}`,
		{
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		}
	);
};
