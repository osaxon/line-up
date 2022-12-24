import orderBy from "lodash/orderBy";

export const getTopArtists = async ({ limit, time_range }) => {
	const res = await fetch(
		"/api/spotify/top-artists?" +
			new URLSearchParams({
				limit,
				time_range,
			}),
		{
			method: "GET",
		}
	);
	const data = res.json();

	return data;
};
