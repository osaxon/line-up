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
	const data = await res.json();
	//const sorted = orderBy(data, ["popularity"], ["desc"]);

	return data;
};
